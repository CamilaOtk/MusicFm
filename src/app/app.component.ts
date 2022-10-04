import { Component } from '@angular/core';
import { listBySearch as listBySearchAlbum } from 'src/app/service/api/album';
import { listBySearch as listBySearchArtist } from 'src/app/service/api/artist';
import{orderBy, flattenDeep}from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'],
})
export class AppComponent {
  listItems: any = [];
  activeLoading: boolean = false;

  async onSearchApi(search: string) {
    this.activeLoading = true;
    const responseAlbum = await listBySearchAlbum(search);
    const responseArtist = await listBySearchArtist(search);
    console.log('response', responseArtist);
    if (responseAlbum.status === 200)
      this.listItems = (responseAlbum.data.results.albummatches.album as any[]).map(
        (item) => {
          const imageDefault = item?.image.find((_img: any) => _img.size === 'extralarge' || _img.size === 'large');
          return {
          ...item,
          type: 'album',
          imageDefault: {
            size: imageDefault?.size,
            src: imageDefault["#text"]
          }
        }}
      );
      if (responseArtist.status === 200)
      this.listItems.push ( (responseArtist.data.results.artistmatches.artist as any[]).map(
        (item) => {
          console.log(item, "viadinho")
          const imageDefault = item?.image.find((_img: any) => _img.size === 'extralarge' || _img.size === 'large');
          return {
          ...item,
          type: 'artist',
          imageDefault: {
            size: imageDefault?.size,
            src: imageDefault["#text"]
          }
        }}
      ));

this.listItems= orderBy(flattenDeep(this.listItems), ['name'] , ['asc'])

    console.log('listItems', this.listItems);
    this.activeLoading = false;
  }
}
