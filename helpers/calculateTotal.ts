import { IApprovedProd } from "../types";

export default function calculateTotalCost (arr : any): number{

let total = 0
if(arr.length > 0){
    arr.forEach((el : IApprovedProd) => {
        total = total + (el.count * el.product.price)
    });
}

total = Number.parseFloat(total.toFixed(2))

return total

}



