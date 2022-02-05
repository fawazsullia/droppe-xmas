import {IApprovedProd} from '../types'

export default function calculateDiscount(arr : any): number {
    let discountTotal = 0;
    if(arr.length > 0){
        let discount : number[] = arr.map((a :IApprovedProd)=> {
            if(a.count > 1){  return a.count * 0.1 * a.product.price  }
            else return 0
        })
        discount.forEach((a)=> discountTotal = discountTotal + a )
    }
    
    discountTotal = Number.parseFloat(discountTotal.toFixed(2))
    
    return discountTotal

}