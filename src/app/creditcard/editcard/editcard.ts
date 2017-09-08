import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { CreditCardModel } from '../model/creditcard.model';

import { EditCardService } from './editcard.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './editcard.html',
  // styles: []
})
export class EditCreditomponent implements OnInit {
  imgSrc: string;
  isConfirmLoading = false;
  editCard: CreditCardModel = new CreditCardModel();
  @ViewChild('form') private form: NgForm;

  // init data
  
  statusOptions = [{id:0, name:'未生效'},{id:1, name:'有效'}];
  levelOptions = [{id:0, name: '普通'},{id:1, name: '金卡'},{id:2, name: '白金卡'}];
  currencyOptions = [{id:0, name:'CNY'},{id:1, name:'多币种'}];
  feeOptions = [{id:0, name:'免首年，交易免年费'},{id:1, name:'终身免年费'},{id:2, name: '有年费'}];
  classifyOptions = [{id:0, name:'车主卡'},{id:1, name:'商旅卡'},{id:2, name: '网购卡'},{id:3, name:'超市卡'},{id:4, name:'女性卡'},{id:5, name:'小白卡'}];

  bankAjaxList:Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editCardService: EditCardService,
    private notification: NzNotificationService
    ) {
  }

  ngOnInit() {
    let id = this.route.params['value']['id'];
    if(id){
      this.getData(id);
    }
    this.searchChange();
  }

  getData(id: any) {
    this.editCardService.getCard(id).subscribe((res: any)=>{
      if(res.success){
        this.editCard = res.data;
      }
    }, (err: any)=>{
      this.notification.error('警告', err.msg);
    });
  }

  save(){
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
    }
    if(this.form.valid){
      this.isConfirmLoading = true;
      this.editCardService.updateCard(this.editCard).subscribe((res: any)=>{
        this.isConfirmLoading = false;
        if(res.success){
          this.notification.success('成功', res.msg);
          this.router.navigate(['/creditcard']);
        } else {
          this.notification.warning('警告', res.msg);
        }
      }, (err: any)=>{
        this.isConfirmLoading = false;
        this.notification.error('警告', err.msg);
      });
    }
  }

  searchChange() {
    this.editCardService.getBankList().subscribe((res: any)=>{
      if(res.success){
        this.bankAjaxList = res.data;
      }
    },err=>{
      this.notification.success('错误', err.msg);
    })
  }

  back(){
    this.router.navigate(['/creditcard'])
  }
}

