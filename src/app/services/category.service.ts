import { Injectable } from '@angular/core';
import PocketBase from 'PocketBase';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  async getCategories() {
    const pb = new PocketBase(environment.baseUrl);
    const records = await pb.collection('Categories').getFullList({
      sort: '-created',
    });
    return records;
  }

  constructor() { }
}
