import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  showAppShare: boolean = false;
  
  constructor() { }
}
