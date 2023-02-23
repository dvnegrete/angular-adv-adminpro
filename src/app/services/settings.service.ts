import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private nodeTheme = document.querySelector('#theme');

  constructor() {
    let themeSaved = localStorage.getItem('theme');
    if (!themeSaved) {
      themeSaved = "blue-dark";
      localStorage.setItem('theme', themeSaved);
    }    
    
    this.nodeTheme?.setAttribute('href', themeSaved);
  }

  changeTheme( theme: string){
    const newUrltheme = `./assets/css/colors/${theme}.css`;
    this.nodeTheme?.setAttribute('href', newUrltheme);
    localStorage.setItem('theme', newUrltheme);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const nodeLinks: NodeListOf<Element> = document.querySelectorAll('.selector');
    nodeLinks.forEach( item => {
      item.classList.remove('working');
      const btnTheme = item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.nodeTheme?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        item.classList.add('working');
      }
    })
  }
}
