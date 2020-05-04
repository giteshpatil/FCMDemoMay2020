import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(private platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fireBaseCloudMessaging()
      this.fireBaseTokenRefresh()
    });
  }

  fireBaseCloudMessaging() {
    //debugger

    setTimeout(() => {
      this.fcm.getToken().then(val => {
        //debugger
        console.log("fireBaseCloudMessaging val", val)
        //this.storage.set(Constants.FcmToken, val)
        //this.token = val

        //console.log("fireBaseCloudMessaging token", this.token)
        this.tokenUpdate()
      }).catch(err => {
        console.log("fireBaseCloudMessaging err", err)
        //this.setRootPage(false)
      });
    }, 13000);



  }

  fireBaseTokenRefresh() {

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("fireBaseTokenRefresh token", token)
      //this.storage.set(Constants.FcmToken, token)
      //this.token = token
      //console.log("fireBaseTokenRefresh this.token", this.token)
      this.tokenUpdate()
    }, err => {
      console.log("fireBaseTokenRefresh err", err)
    })
  }

  tokenUpdate() {
    console.log("handleNotifications")
    this.platform.ready().then(res => {
      this.fcm.onNotification().subscribe(data => {
        let notificationData = data
        if (data.wasTapped == true) {
          console.log("Received in background", data);
        } else {
          console.log("Received in foreground", data);
        }
      });
    })
  }
}

