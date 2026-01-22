import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { FormsService } from '../../@services/forms.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-index',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(private formsService: FormsService) { }

  // 全部資料
  formsAllData: any[] = [];

  // 展覽
  exhibitionData: any[] = [];

  // 研討會
  seminarData: any[] = [];

  // 見面會
  meetingData: any[] = [];

  ngOnInit(): void {
    this.formsAllData = this.formsService.forms;
    this.exhibitionData = this.formsAllData.filter((item) => item.formType == '展覽');
    this.seminarData = this.formsAllData.filter((item) => item.formType == '研討會');
    this.meetingData = this.formsAllData.filter((item) => item.formType == '見面會');
  }

}
