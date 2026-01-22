import { Component } from '@angular/core';
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { Location, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormField, FormsService, userResponse } from '../../@services/forms.service';

interface DisplayItem {
  questionID: number;
  questionDescription: string;
  questionType: string;
  userAnswer: any; // 存放使用者填的答案
}

@Component({
  selector: 'app-comfirm-form',
  imports: [FooterComponent, HeaderComponent, NgClass],
  templateUrl: './comfirm-form.component.html',
  styleUrl: './comfirm-form.component.scss'
})
export class ComfirmFormComponent {
  constructor(
    private location: Location,
    private router: Router,
    private formsService: FormsService) { };

  // 用來存放要使用者輸入的資料
  inputData?: userResponse;
  // 用來存放表單結構（標題、描述等）
  formData?: FormField;
  // 要顯示出來的資料
  displayData: any = {
    userInfo: null,
    answers: []
  };

  // 初始化
  ngOnInit() {
    // 1. 取得暫存答案
    this.inputData = this.formsService.tempResponse;


    // 2. 取得表單結構 (根據 formID)
    if (this.inputData) {
      this.formData = this.formsService.forms.find(f => f.formID == this.inputData?.formID);

      console.log(this.inputData);

      if (this.formData) {
        this.displayData.userInfo = this.inputData.userInfo;
        this.displayData.answers = this.formData.formFields.map(item => {
          return {
            questionID: item.questionID,
            questionDescription: item.questionDescription,
            questionType: item.questionType,
            questionAnswer: this.inputData?.answers[item.questionID],
          }
        });
      }
      console.log(this.displayData);

    } else {
      // 沒資料就回列表
      // this.router.navigate(['/form-list']);
    }

  }

  // 回上一頁
  cancel() {
    this.location.back();
  }

  // 確認送出
  goSubmit() {
    Swal.fire({
      title: '確定要送出表單嗎？',
      text: "您輸入的內容將無法修改！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8a00', // 建議用你的主題橘色
      cancelButtonColor: '#6c757d',
      confirmButtonText: '確定送出',
      cancelButtonText: '繼續填寫',
      reverseButtons: true // 讓確定按鈕在右邊，符合一般習慣
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/form-list');
      }
    });
  }
}
