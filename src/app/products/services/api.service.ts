import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cartItemCount= new BehaviorSubject(0)//to hold the cart item count

  searchTerm=new BehaviorSubject('');//to hold the search value //behaviourSubject - is used to pass stream of data from one component to another component

  constructor(private http:HttpClient) {
    this.cartCount()
  }

  BASE_URL= 'https://ecart-dlpe.onrender.com'




   //api function to get all products from database
   getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
   }

   //api function to view particular products from database
   viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
   }


   //api function to add product to the wishlist
   addToWishlist(id:any,title:any,price:any,image:any){
    const body= {
      id,
      title,
      price,
      image
    }
      return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
   }

   //view wishlist products
   viewWishlist(){
    return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlists`)
   }

   //deleteWishlist
   deleteWishlistProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
   }

   //add to cart
   addToCart(product:any){//product is an object with properties
    //get the product details 
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)

   }

   //getcart
   getCart(){
    return this.http.get(`${this.BASE_URL}/carts/get-cart`)
   }

   //to get the cart product count
   cartCount(){
    this.getCart().subscribe((result:any)=>{
      this.cartItemCount.next(result.length)
    })
   }

   //delete cart products

   deleteProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/delete-product/${id}`)
   }

   //increment product in cart and update the value
   incrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
   }

   //decrement product count
   decrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement-product/${id}`)
   }
}
