import { Injectable } from '@angular/core';

// 基本資料
export interface userBasicInfo {
  name: string;
  age?: number;
  tel: string;
  email: string;
}

// 問題欄位
export interface questionField {
  questionID: number,
  questionDescription: string,
  questionType: string,
  questionHolder?: string,
  questionOptions?: string[]
  questionRequired: boolean,
}

// 表單欄位
export interface FormField {
  formID: number,
  formTitle: string,
  formDescription: string,
  formFields: Array<questionField>,
  formIsOpen: boolean,
  formSDate: string,
  formEDate: string,
  formFilledPeople?: Array<number>,
  formType?: string
}

// 使用者回答
export interface userResponse {
  responseID: number;
  formID: number;
  userInfo: userBasicInfo,
  answers: { [questionID: number]: any },
  sumbitDate?: string
}


@Injectable({
  providedIn: 'root'
})


export class FormsService {
  // 初始表單值
  forms: FormField[] = [
    {
      formID: 1,
      formTitle: '科技展覽回饋問卷',
      formDescription: '請分享您對本次科技展覽的感受與建議。',
      formFields: [
        { questionID: 1, questionDescription: '展覽整體規劃如何？', questionType: 'single-choice', questionOptions: ['非常好', '普通', '需要改善'], questionRequired: true },
        { questionID: 2, questionDescription: '最喜歡的展區是？', questionType: 'multiple-choice', questionOptions: ['AI 展區', 'VR 展區', '智慧家電展區'], questionRequired: true },
        { questionID: 3, questionDescription: '有什麼建議？', questionType: 'text', questionHolder: "請填入建議", questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2025-12-01',
      formEDate: '2025-12-31',
      formType: '展覽'
    },
    {
      formID: 2,
      formTitle: 'AI 研討會回饋問卷',
      formDescription: '請提供您對研討會的滿意度與建議。',
      formFields: [
        { questionID: 1, questionDescription: '研討會內容是否符合期待？', questionType: 'single-choice', questionOptions: ['非常符合', '部分符合', '不符合'], questionRequired: true },
        { questionID: 2, questionDescription: '最喜歡的講者是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2025-11-15',
      formEDate: '2025-11-20',
      formType: '研討會'
    },
    {
      formID: 3,
      formTitle: '社群見面會回饋問卷',
      formDescription: '請分享您在見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '見面會氛圍如何？', questionType: 'single-choice', questionOptions: ['非常好', '普通', '需要改善'], questionRequired: true },
        { questionID: 2, questionDescription: '希望未來增加哪些活動？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: false,
      formSDate: '2025-10-01',
      formEDate: '2025-10-05',
      formType: '見面會'
    },
    {
      formID: 4,
      formTitle: '美食展覽問卷',
      formDescription: '請分享您對美食展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的美食是？', questionType: 'multiple-choice', questionOptions: ['甜點', '燒烤', '飲品'], questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-09-01',
      formEDate: '2026-09-10',
      formType: '展覽'
    },
    {
      formID: 5,
      formTitle: '教育研討會問卷',
      formDescription: '請提供您對教育研討會的意見。',
      formFields: [
        { questionID: 1, questionDescription: '研討會是否有幫助？', questionType: 'single-choice', questionOptions: ['非常有幫助', '普通', '沒有幫助'], questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-08-01',
      formEDate: '2026-08-05',
      formType: '研討會'
    },
    {
      formID: 6,
      formTitle: '動漫見面會問卷',
      formDescription: '請分享您在動漫見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的角色是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-07-01',
      formEDate: '2026-07-03',
      formType: '見面會'
    },
    {
      formID: 7,
      formTitle: '科技新品發表展問卷',
      formDescription: '請分享您對新品發表的看法。',
      formFields: [
        { questionID: 1, questionDescription: '新品是否吸引您？', questionType: 'single-choice', questionOptions: ['非常吸引', '普通', '不吸引'], questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-06-01',
      formEDate: '2026-06-05',
      formType: '展覽'
    },
    {
      formID: 8,
      formTitle: '醫療研討會問卷',
      formDescription: '請提供您對醫療研討會的意見。',
      formFields: [
        { questionID: 1, questionDescription: '研討會是否有幫助？', questionType: 'single-choice', questionOptions: ['非常有幫助', '普通', '沒有幫助'], questionRequired: true }
      ],
      formIsOpen: false,
      formSDate: '2026-05-01',
      formEDate: '2026-05-02',
      formType: '研討會'
    },
    {
      formID: 9,
      formTitle: '音樂見面會問卷',
      formDescription: '請分享您在音樂見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的表演是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-04-01',
      formEDate: '2026-04-03',
      formType: '見面會'
    },
    {
      formID: 10,
      formTitle: '藝術展覽問卷',
      formDescription: '請分享您對藝術展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的作品是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-03-01',
      formEDate: '2026-03-10',
      formType: '展覽'
    },
    {
      formID: 11,
      formTitle: '旅遊展覽問卷',
      formDescription: '請分享您對旅遊展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最想去的國家是？', questionType: 'text', questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-02-01',
      formEDate: '2026-02-05',
      formType: '展覽'
    },
    {
      formID: 12,
      formTitle: '金融研討會問卷',
      formDescription: '請提供您對金融研討會的意見。',
      formFields: [
        { questionID: 1, questionDescription: '研討會是否有幫助？', questionType: 'single-choice', questionOptions: ['非常有幫助', '普通', '沒有幫助'], questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-01-01',
      formEDate: '2026-01-02',
      formType: '研討會'
    },
    {
      formID: 13,
      formTitle: '粉絲見面會問卷',
      formDescription: '請分享您在粉絲見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的環節是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-12-01',
      formEDate: '2026-12-03',
      formType: '見面會'
    },
    {
      formID: 14,
      formTitle: '汽車展覽問卷',
      formDescription: '請分享您對汽車展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的車款是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-11-01',
      formEDate: '2026-11-10',
      formType: '展覽'
    },
    {
      formID: 15,
      formTitle: '環保研討會問卷',
      formDescription: '請提供您對環保研討會的意見。',
      formFields: [
        { questionID: 1, questionDescription: '您是否願意參與環保活動？', questionType: 'single-choice', questionOptions: ['是', '否'], questionRequired: true }
      ],
      formIsOpen: true,
      formSDate: '2026-10-01',
      formEDate: '2026-10-02',
      formType: '研討會'
    },
    {
      formID: 16,
      formTitle: '遊戲見面會問卷',
      formDescription: '請分享您在遊戲見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的遊戲是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-09-01',
      formEDate: '2026-09-03',
      formType: '見面會'
    },
    {
      formID: 17,
      formTitle: '設計展覽問卷',
      formDescription: '請分享您對設計展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的設計風格是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-08-01',
      formEDate: '2026-08-10',
      formType: '展覽'
    },
    {
      formID: 18,
      formTitle: '醫學研討會問卷',
      formDescription: '請提供您對醫學研討會的意見。',
      formFields: [
        { questionID: 1, questionDescription: '研討會是否有幫助？', questionType: 'single-choice', questionOptions: ['非常有幫助', '普通', '沒有幫助'], questionRequired: true }
      ],
      formIsOpen: false,
      formSDate: '2026-07-01',
      formEDate: '2026-07-02',
      formType: '研討會'
    },
    {
      formID: 19,
      formTitle: '舞蹈見面會問卷',
      formDescription: '請分享您在舞蹈見面會的體驗。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的舞蹈表演是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-06-01',
      formEDate: '2026-06-03',
      formType: '見面會'
    },
    {
      formID: 20,
      formTitle: '攝影展覽問卷',
      formDescription: '請分享您對攝影展的看法。',
      formFields: [
        { questionID: 1, questionDescription: '您最喜歡的攝影作品是？', questionType: 'text', questionRequired: false }
      ],
      formIsOpen: true,
      formSDate: '2026-05-01',
      formEDate: '2026-05-10',
      formType: '展覽'
    }

  ];

  // 暫存的資料
  tempResponse?: userResponse;

  // 儲存全部的資料
  private allResponse: userResponse[] = [];

  constructor() { }
}
