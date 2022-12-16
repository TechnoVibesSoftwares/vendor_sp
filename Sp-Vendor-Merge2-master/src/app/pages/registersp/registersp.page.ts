import { Component, OnInit } from '@angular/core';
import { SpregisterService } from 'src/app/services/spregister.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {  MenuController,NavController } from '@ionic/angular';


@Component({
  selector: 'app-registersp',
  templateUrl: './registersp.page.html',
  styleUrls: ['./registersp.page.scss'],
})
export class RegisterspPage implements OnInit {
  public errorMessage: string;

  data = {
    name: '',
    contact: '',
    email: '',
    password: '',
  };

  constructor(
   private SpregisterService: SpregisterService,
    private toastController: ToastController,
    private router: Router,
    public menu: MenuController,
    private nav: NavController
  ) {}

  ngOnInit() {

  }

  doSubmitForm(){
    console.log("Try to submit form");
    console.log("DATA ",this.data);

    if(this.data.email=='' || this.data.password=='')
    {
      this.presentToast("Fields can not be empty");

    }
    else{
    this.SpregisterService.SpregisterService(this.data).subscribe(
      response=>{
        console.log(response);
        this.presentToast("Successfully Registered");
    },
      error=>{

        console.log("Error from server : " + error);
        this.presentToast(error);
    }
    )
  }
  }

  async presentToast(msg) {
     const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
     });
    await toast.present();
  }

  ionViewDidEnter() {

       this.menu.enable(true, 'main');
        this.menu.enable(false, 'main1');

}
}



