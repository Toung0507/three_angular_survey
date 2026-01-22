import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormField, FormsService, userBasicInfo, userResponse } from '../../@services/forms.service';
import { Location, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-fill-form',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, NgClass],
  templateUrl: './fill-form.component.html',
  styleUrl: './fill-form.component.scss'
})
export class FillFormComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formsService: FormsService,
    private location: Location) {
    this.formID = Number(this.route.snapshot.paramMap.get('formId'));
  }

  // 全部資料
  formID!: number;
  formsAllData: any[] = [];
  formsData!: FormField;

  // 填寫資料
  userInfo: userBasicInfo = {
    name: '',
    tel: '',
    email: '',
    age: undefined
  };
  answers: { [key: number]: any } = {};

  // 驗證狀態開關：預設為 false，點擊下一步後變為 true
  showAll = false;

  ngOnInit(): void {
    this.formsAllData = this.formsService.forms;
    this.formsData = this.formsAllData.find((item) => item.formID == this.formID);

    const savedResponse = this.formsService.tempResponse;
    if (savedResponse && savedResponse.formID === this.formID) {
      this.userInfo = { ...savedResponse.userInfo };
      this.answers = { ...savedResponse.answers };
    }
  }

  // --- 三種分類驗證工具函數 ---

  /**
   * 1. 判斷是否為空 (姓名、單選、文字題、複選、問卷必填)
   */
  isEmpty(value: any): boolean {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    return false;
  }

  /**
   * 2. 檢查手機格式 (09開頭10位數)
   */
  isTelInvalid(value: string): boolean {
    if (!value) return true;
    const telRegex = /^09\d{8}$/;
    // 如果你有處理連字號的需求，可以加上 .replace(/-/g, '')
    return !telRegex.test(value);
  }

  /**
   * 3. 檢查 Email 格式
   */
  isEmailInvalid(value: string): boolean {
    if (!value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value);
  }

  // 複選題處理邏輯
  onCheckboxChange(questionID: number, option: string) {
    if (!this.answers[questionID]) {
      this.answers[questionID] = [];
    }
    const isHave = this.answers[questionID].indexOf(option);
    if (isHave > -1) {
      this.answers[questionID].splice(isHave, 1);
    } else {
      this.answers[questionID].push(option);
    }
  }

  // 取消
  onCancel(): void {
    Swal.fire({
      title: '確定要取消填寫嗎？',
      text: "您輸入的內容將不會被儲存！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8a00',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '確定取消',
      cancelButtonText: '繼續填寫',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.formsService.tempResponse = undefined;
        this.location.back();
      }
    });
  }

  // 當資料改變時 (如果 HTML 有呼叫此方法，目前保留但不做複雜運算)
  onDataChange() {
    // 現在驗證邏輯由 HTML 透過工具函數即時判斷，此處可留空
  }

  // 下一步預覽按鈕
  goComfirm() {
    this.showAll = true; // 開啟全域紅字提示

    // 檢查基本資料
    const nameErr = this.isEmpty(this.userInfo.name);
    const telErr = this.isTelInvalid(this.userInfo.tel);
    const emailErr = this.isEmailInvalid(this.userInfo.email);

    // 檢查問卷必填題
    let questionError = false;
    for (const field of this.formsData.formFields) {
      if (field.questionRequired) {
        if (this.isEmpty(this.answers[field.questionID])) {
          questionError = true;
          break; // 只要有一題沒填就報錯
        }
      }
    }

    // 總體驗證判斷
    if (nameErr || telErr || emailErr || questionError) {
      this.showErrorAlert('請檢查紅字標示欄位');
      return;
    }

    // 驗證通過，執行原本邏輯
    const response: userResponse = {
      responseID: Date.now(),
      formID: this.formID,
      userInfo: this.userInfo,
      answers: this.answers,
    };

    this.formsService.tempResponse = response;
    this.router.navigate(['/confirm-form', this.formID]);
  }

  // 統一的錯誤提示
  showErrorAlert(message: string) {
    Swal.fire({
      title: '資料尚未完成',
      text: message,
      icon: 'error',
      confirmButtonColor: '#ff8a00'
    });
  }
}
