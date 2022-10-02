import { Component } from '@angular/core';
import { listBySearch as listBySearchAlbum } from 'src/app/service/api/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'],
})
export class AppComponent {
  listItems: any = [1, 2, 3, 4, 5];
  activeLoading: boolean = false;

  async onSearchApi(search: string) {
    this.activeLoading = true;
    const response = await listBySearchAlbum(search);
    console.log('response', response);
    if (response.status === 200)
      this.listItems = (response.data.results.albummatches.album as any[]).map(
        (item) => ({
          ...item,
          type: 'album',
        })
      );
    console.log('listItems', this.listItems);
    this.activeLoading = false;
  }
}
