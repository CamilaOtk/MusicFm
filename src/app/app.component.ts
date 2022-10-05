import { Component, OnInit } from '@angular/core';
import { listBySearch as listBySearchAlbum } from 'src/app/service/api/album';
import { listBySearch as listBySearchArtist } from 'src/app/service/api/artist';
import { orderBy, flattenDeep, xorBy } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'],
})
export class AppComponent implements OnInit {
  originalItems: any[] = [];
  listItems: any = [];
  activeLoading: boolean = false;
  tab: any = 'Dashboard';
  menuTabs: any[] = ['Dashboard', 'Albuns', 'Artistas', 'Historico'];

  dataArtistas: any[] = [];
  dataAlbuns: any[] = [];

  ngOnInit() {
    this.updateHistorico();
  }

  updateHistorico() {
    this.dataArtistas = JSON.parse(
      localStorage.getItem('historico:artitas') ?? '[]'
    );
    this.dataAlbuns = JSON.parse(
      localStorage.getItem('historico:albuns') ?? '[]'
    );
    return { dataArtistas: this.dataArtistas, dataAlbuns: this.dataAlbuns };
  }

  deleteItemHistorico(item: any) {
    if (item.subType === "artist") {
      this.dataArtistas = this.dataArtistas.filter(
        (_item) => _item.id !== item.id
      );
      localStorage.setItem(
        'historico:artitas',
        JSON.stringify(this.dataArtistas)
      );
    } else if (item.subType === "album") {
      this.dataAlbuns = this.dataAlbuns.filter(
        (_item) => _item.id !== item.id
      );

      localStorage.setItem(
        'historico:albuns',
        JSON.stringify(this.dataAlbuns)
      );
    }
    this.handleChangeTab(this.tab)
  }

  handleChangeTab(tab: string) {
    if (tab === 'Dashboard') this.listItems = this.originalItems;
    else if (tab === 'Albuns')
      this.listItems = this.originalItems.filter(
        (item) => item.type === 'album'
      );
    else if (tab === 'Artistas')
      this.listItems = this.originalItems.filter(
        (item) => item.type === 'artist'
      );
    else if (tab === 'Historico') {
      const historico = this.updateHistorico();
      this.listItems = flattenDeep([
        historico.dataArtistas,
        historico.dataAlbuns,
      ]).map((item, index) => ({
        ...item,
        type: 'historico',
        subType: item.type,
        id: item.id,
        images: item[item.type === 'artist' ? 'artist' : 'album']
          ?.map(
            (_item: any) =>
              _item.image.find((_img: any) => _img.size === 'large')['#text'] ??
              ''
          )
          .slice(0, 3),
        name: `Forma encontradas ${
          item.results['opensearch:totalResults'] ?? 0
        } ${item.type === 'artist' ? 'músicas' : 'albuns'} de ${
          item.results['@attr'].for
        }`,
      }));
    }

    this.tab = tab;
  }

  // async getTops() {
  //   listTops().then((response) => {
  //     const todayDash = JSON.parse(
  //       localStorage.getItem('dashboard:artists') ?? ''
  //     );
  //     if (
  //       response.status === 200 &&
  //       this.tab === 'Dashboard' &&
  //       new Date(todayDash.date).getDay() !== new Date().getDay()
  //     ) {
  //       this.listItems = response.data.artists.artist;
  //       localStorage.setItem(
  //         'dashboard:artists',
  //         JSON.stringify({
  //           date: new Date().toISOString(),
  //           list: response.data.artists.artist,
  //         })
  //       );
  //     } else {
  //       this.listItems = todayDash.artists;
  //     }
  //   });
  // }

  async onSearchApi(search: string) {
    this.activeLoading = true;
    const responseArtist = await listBySearchArtist(search);
    const responseAlbum = await listBySearchAlbum(search);

    if (responseAlbum.status === 200) {
      localStorage.setItem(
        'historico:albuns',
        JSON.stringify(
          flattenDeep([
            {
              ...responseAlbum.data,
              album: responseAlbum.data.results.albummatches.album.slice(0, 5),
              type: 'album',
              id: (this.dataAlbuns?.length ?? 0) + 1,
            },
            this.dataAlbuns,
          ])
        )
      );

      this.listItems = (
        responseAlbum.data.results.albummatches.album as any[]
      ).map((item) => {
        const imageDefault = item?.image.find(
          (_img: any) => _img.size === 'extralarge' || _img.size === 'large'
        );
        return {
          ...item,
          type: 'album',
          imageDefault: {
            size: imageDefault?.size,
            src: imageDefault['#text'],
          },
        };
      });
    }
    if (responseArtist?.status === 200) {
      this.listItems.push(
        (responseArtist?.data.results.artistmatches.artist as any[]).map(
          (item) => {
            const imageDefault = item?.image.find(
              (_img: any) => _img.size === 'extralarge' || _img.size === 'large'
            );
            return {
              ...item,
              type: 'artist',
              imageDefault: {
                size: imageDefault?.size,
                src: imageDefault['#text'],
              },
            };
          }
        )
      );
      localStorage.setItem(
        'historico:artitas',
        JSON.stringify(
          flattenDeep([
            {
              ...responseArtist?.data,
              artist: responseArtist?.data.results.artistmatches.artist.slice(
                0,
                5
              ),
              type: 'artist',
              id: (this.dataArtistas?.length ?? 0) + 1,
            },
            this.dataArtistas,
          ])
        )
      );
    }

    this.listItems = orderBy(flattenDeep(this.listItems), ['name'], ['asc']);
    this.originalItems = this.listItems;
    this.handleChangeTab(this.tab);
    this.activeLoading = false;
  }
}
