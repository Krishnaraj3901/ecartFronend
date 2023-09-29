import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allWishlist:any=[];
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.viewWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allWishlist=result
      this.api.cartCount()
    },
     (result:any)=>{
      console.log(result.error);
      
     }
    )
  }
  
  //delete wishlist item from wishlist
  deleteWishlistItem(id:any){
    this.api.deleteWishlistProduct(id).subscribe((result:any)=>{
      this.allWishlist=result;//assign remaining items to wishlist
      alert('product removed successfully')
    })
  }
}

