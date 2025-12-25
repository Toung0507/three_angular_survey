import { Component } from '@angular/core';
import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from "../layout/header/header.component";

@Component({
  selector: 'app-fill-form',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './fill-form.component.html',
  styleUrl: './fill-form.component.scss'
})
export class FillFormComponent {

}
