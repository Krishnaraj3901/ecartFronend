import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CARTComponent implements OnInit {

  //paypal variable
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean=false;

  showpaypalButton:boolean=false;


    //used to hide didscount coupon
  discountStatus:boolean=false;

    //used to hide address form
  proceedToPaymentStatus: boolean =false;

  //offers click

  offerClick:boolean=false;
  //to hold delivery informatiom
  name:string='';
  houseNumber:string='';
  streetName:string='';
  state:string='';
  pinNumber:string='';
  mobileNumber:string='';


  cartTotalPrice=0;
  allCart:any=[]
  constructor(private api:ApiService,private cartfb:FormBuilder){}
  ngOnInit(): void {
    this.api.getCart().subscribe((result:any)=>{
      console.log(result);
      this.allCart=result;
      this.getCartTotal()
      //paypal function
      this.initConfig();
      
    },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }
  deleteCartProduct(id:any){
    this.api.deleteProduct(id).subscribe((result:any)=>{
      this.allCart=result;//will refresh remaining product
      this.api.cartCount()//will update cart count
      this.getCartTotal()//will update cart value
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }
    //get cart total

    getCartTotal(){
      let total=0;
      this.allCart.forEach((item:any)=>{
        total+=item.grandTotal
        this.cartTotalPrice=Math.ceil(total)
      })
    }

    //increment cart 

    incrementCartProduct(id:any){
      this.api.incrementProduct(id).subscribe((result:any)=>{
        this.allCart=result;
        this.getCartTotal()
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

    //decrement product count
    decrementCartProduct(id:any){
      this.api.decrementProduct(id).subscribe((result:any)=>{
        this.allCart=result;
        this.getCartTotal()
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

    //address form
    addressForm=this.cartfb.group({
      name:[''],
      houseNumber:[''],
      streetName:[''],
      state:[''],
      pinNumber:[''],
     mobileNumber:[''],
    })

    submitForm(){
      if(this.addressForm.valid){
        this.proceedToPaymentStatus=true;
        this.name = this.addressForm.value.name||'';
      this.houseNumber = this.addressForm.value.houseNumber||'';
      this.streetName = this.addressForm.value.streetName||'';
      this.state = this.addressForm.value.state||'';
      this.pinNumber = this.addressForm.value.pinNumber||'';
      this.mobileNumber = this.addressForm.value.mobileNumber||'';
      }
      else{
        alert('please enter valid details')
      }
    }

    offerClicked(){
      this.offerClick=true
    }

    discountCalculate(value:any){
      this.discountStatus=true
      this.cartTotalPrice=this.cartTotalPrice*(100-value)/100
    }

    private initConfig(): void {
      this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  makepay(){
  this.showpaypalButton=true;
  }
}
