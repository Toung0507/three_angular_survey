import { FlatPickrDayCreateOutputOptions } from './../../../../node_modules/angularx-flatpickr/lib/flatpickr.directive.d';
import { Component } from '@angular/core';
import { FormsService } from '../../@services/forms.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { FlatpickrDirective } from 'angularx-flatpickr';
import ChineseT from 'flatpickr/dist/l10n/zh-tw.js';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-form-list',
  imports: [FormsModule, NgClass, HeaderComponent, FooterComponent, FlatpickrDirective, RouterLink],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})

export class FormListComponent {

  constructor(private formsService: FormsService) { }

  // 全部資料
  formsAllData: any[] = [];
  formsData: any[] = [];
  state: any[] = []; // 儲存狀態欄的資料

  // 分頁設定
  showForms: any[] = [];     // 顯示的資料
  pageSize: number = 5;      // 目前顯示的筆數
  currentPage: number = 1;   // 目前第幾頁
  totalPage: number = 0;     // 總共會有幾頁

  // 搜尋框
  // selectedDateRange: any = { from: null, to: null }; // 指一個輸入框可以範圍選擇日期
  zh = ChineseT;             // 定義給 HTML 使用
  searchDatas: {
    keyWords: string;
    startDate: string;
    endDate: string;
    [key: string]: string;   // 此行代表可以用 字典去搜尋，不加會造成，不能直接更動值
  } = {
      keyWords: '',
      startDate: '',
      endDate: ''
    };

  ngOnInit(): void {
    this.formsAllData = this.formsService.forms;
    this.initData(this.formsAllData);
  }

  // 初始化資料
  initData(source: any) {
    this.formsData = source;
    this.showForms = this.formsData.slice(0, this.pageSize);
    this.totalPage = Math.ceil(this.formsData.length / this.pageSize); // 向上取整數
  }

  // 讓切換頁面時css會動
  changePageCss(index: any) {
    this.currentPage = index + 1;
    this.changeShowForms();
  }

  // 控制上下頁
  changePageUpDown(isUp: boolean) {
    if (isUp) this.currentPage++;
    else this.currentPage--;
    this.changeShowForms();
  }

  // 重新設定顯示的資料
  changeShowForms() {
    let start = (this.currentPage - 1) * this.pageSize;
    let end = start + this.pageSize;
    this.showForms = this.formsData.slice(start, end);
  }

  // 更換顯示的數量
  changeSize(event: any) {
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.totalPage = Math.ceil(this.formsData.length / this.pageSize);
    this.changeShowForms();
  }

  // 搜尋資料
  searchData(event: any) {
    const { name, value } = event.target;
    this.searchDatas[name] = value;

    this.formsData = this.formsAllData.filter(item => {
      // 先將資料取出來放一個變數
      const itemkeyword = item.formTitle;
      const inputKeywords = this.searchDatas.keyWords;
      const itemSdate = item.formSDate;
      const itemEdate = item.formEDate;
      const inputSdate = this.searchDatas.startDate;
      const inputEdate = this.searchDatas.endDate;

      // 做三者比對，若為空值，則前面的 !會反轉讓他變成 true
      const matchKeyword = !inputKeywords || itemkeyword.includes(this.searchDatas.keyWords);
      const matchStart = !inputSdate || itemSdate >= inputSdate;
      const matchEnd = !inputEdate || itemEdate <= inputEdate;

      // 測試用
      // console.log('篩選詳情:', {
      //   title: item.formTitle,
      //   matchKeyword,
      //   matchStart,
      //   matchEnd
      // });

      return matchKeyword && matchStart && matchEnd;
    });

    // 更新分頁資訊
    this.currentPage = 1;
    this.totalPage = Math.ceil(this.formsData.length / this.pageSize);

    // 這裡還是要呼叫，因為 showForms 是「當前頁面要顯示的資料」
    this.changeShowForms();
  }

  // 重置資料

}
