import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Establecer el idioma por defecto
    translate.setDefaultLang('es'); // El idioma predeterminado es el español
  }

  // Función para cambiar el idioma dinámicamente
  switchLanguage(language: string) {
    this.translate.use(language); // Cambia el idioma a 'en' o 'es'
  }
}
