export class Products {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public model: string,
    public img: string,
    public size: any,
    public price: number,
    public company: string,
    public category: string,
    public subCategory: string
  ){

  }
}
