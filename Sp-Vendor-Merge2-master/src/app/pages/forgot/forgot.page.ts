import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ForgotService } from 'src/service/forgot.service';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  public errorMessage: string;
  data = {
    email: '',
    pass: '',
    confirmpas: '',
  };

  constructor(
    private toastController: ToastController,
    public ForgotService: ForgotService,
    public menu: MenuController,
    private nav: NavController
  ) {}


  ngOnInit() {}

  logini() {
    console.log('Try to submit form');
    console.log('DATA ', this.data);

    if (this.data.email == '' || this.data.pass == '') {
      //alert('login success');
      alert('login failed');
      this.presentToast('filed cannot be empty');

    } else if (this.data.pass != this.data.confirmpas) {
      this.presentToast('Password not match');
    } else {
      this.ForgotService.ForgotService(this.data).subscribe(
        (response) => {
          console.log(response);
          this.presentToast('Successfully Registered');
        },
        (error) => {
          console.log('Error from server : ' + error);
          this.presentToast(error);
        }
      );
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });

    await toast.present();
  }
}
