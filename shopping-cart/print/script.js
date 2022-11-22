Vue.component('printing', {
      template: '#printing-template',
      props: {
            master: {
                type: Object,
                default: {}
            },
            items: {
                type: Array,
                default:[]
            },
            perpage: {
                type: Number,
                default: 15
            },
            vatrate: {
                type: Number,
                default: 7
            },
            columns: {
                type: Array,
                default:[
                    // { classname:'align-left', field:'id', label:'SKU' },
                    // { classname:'align-left', field:'name', label: 'สินค้าง' },
                    // { classname:'align-right', field:'price', label: 'ราคา (฿) / หน่วย' },
                    // { classname:'align-center', field:'qty', label: 'จำนวน'},
                    // { classname:'align-right', field:'total', label: 'ราคารวม (฿)'},
                ]
            },
            calfield : {
                type: Function,
                default: (i,c)=>i[c.field]
            },
            decimal: {
                type: Number,
                default: 2
            },
            sumtotal: {
                type: Function,
                default: (items)=>items.reduce((o,i) => o+(i.price*i.qty),0).toLocaleString('th-TH', {minimumFractionDigits: decimal })
            },
            calculatotal: {
                type: Function,
                default: (i)=>i
            },
            calcuvat: {
                type: [Number,Function],
                default: (i)=>i 
            },
            pagesize: {
                type: String,
                default: 'A4'
            }
      },
      data() {
        return {
            isfalse:false,
            istrue:true,
        }
      },
      computed: {
            pages() {
                let p = [];
                console.log('p,i before',p)
                let pp = +this.perpage;
                p = this.items.map((e,i)=>{
                     return i%pp === 0 ? this.items.slice(i,Number(i+pp)).filter((e)=>{ return e }) : null
                    })
                console.log(p)
                p = p.filter(i=>i!=null)
                console.log(p)
                return p;
            },
            vat(){
                if( typeof this.calcuvat == 'number' ){
                    return this.calcuvat;
                } else {
                    return this.calcuvat(this.items,this.vatrate);
                }
            },
            today(){
                return new Date().toISOString().slice(0,10);//.replace(/-/g,"");
            },
            now(){
                return new Date().toISOString().slice(0,19).replace('T',' ')
            },
            scrheihgt(){
                return screen.height;
            },
            bodyheihgt(){
                return this.scrheight - 300;
            },
            pageclass(){
                return this.pagesize;
            }, 
            prinonly(){
                return 'printonly';
            },
            bodyblockheight(){
                console.log(this.pagesize);
                let size = 0;
                switch (this.pagesize)
                {
                    case "A3":
                        size = 419;
                    break;
                    case "A3 landscape":
                        size = 296;
                    break;
                    case "A4 landscape":
                        size = 209;
                    break;
                    case "A5 landscape":
                        size = 147;
                    break;
                    case "A5":
                        size = 209;
                    break;
                    default: 
                        size = 296;
                }
                console.log('new size =',size-40)
                return (size - 40 );
            }

      },
      methods: {
        // calfield(item,col) {
        //     if(item[col.field]) {
        //         if(col.fiexd){
        //             let digi = Number(col.fiexd);
        //             return item[col.field].toLocaleString('th-TH', {minimumFractionDigits: digi });
        //         } else {
        //             return item[col.field];
        //         }
        //     } else {
        //         return col.func(item.qty,item.price);
        //     }
        // }
      }
    });
  
     let obj = {
        firstname: 'T',
        lastname: 'Lim',
        get fullname() {
           return this.firstname + ' ' + this.lastname;
        }
     }
     
     console.log(obj.fullname);

    var vm = new Vue({
        mixins: [],
        data: {
            lim: obj,
            pagesize:'A4',
            additem:0,
            maincount:20,
            vatrate:7,
            // vat: 23423423,
            perpage:15,
            columns: [
                    { classname:'align-left',   field:'id',    label: '#sku'     },
                    { classname:'align-left',   field:'name',  label: 'product name'    },
                    { classname:'align-right',  field:'price', label: 'price(฿)/unit' , decimal: 2 },
                    { classname:'align-center', field:'qty',   label: 'qty'},
                    // { classname:'align-right',  field:'vat',   label: 'discount' , func:(a,b)=>(a*b/100), decimal:2 },
                    { classname:'align-right',  field:'total', label: 'total(฿)' ,func: (a,b)=>(a*b).toLocaleString('th-TH', {minimumFractionDigits: 2 }) },
                ],
            master:{
                repname: 'Qutation',
                billno: 'QT20170600001',
                billdate:new Date().toISOString().slice(0,10),
                tackingcode :'34123413234',
                vatrate:7,
                vattype:1,  // 0 novat 1,excute vat 2 includevat
                vat:300,
                name: 'Customer Name Co,.Ltd.',
                address1: '203/7 Ladplao 15 Rd.',
                address2: 'Jatujak Bkk',
                province: 'Bangkok/Thailand',
                zipcode: '10250',
                tel: '081-6477729',
                email: 'email@email.com',
                line: 'tlen4105',
                facebook: 'thongchai@servit.co.th',
                note: 'Note Note Note Note Note Note Note',
			},
            // items:[]
            items:[
				  {
				    "id": "001",
				    "name": "iPad Pro",
				    "price": 30900,
				    "storage": 32,
				    "type": "iPad",
                    "qty":1,
                    "size": "12.9",
                  },
                  {
                    "id": "002",
                    "name": "iPad Pro",
                    "price": 34900,
                    "storage": 128,
                    "type": "iPad",
                    "qty":2,
                    "size": "12.9",
                  },
                  {
                    "id": "003",
                    "name": "iPad Pro",
                    "price": 38900,
                    "storage": 256,
                    "type": "iPad",
                    "qty":1,
                    "size": "12.9"
                  },
                  {
                    "id": "004",
                    "name": "iPad Pro",
                    "price": 22900,
                    "qty":1,
                    "storage": 32,
                    "type": "iPad",
                    "size": "9.7"
                  },
                  {
                    "id": "005",
                    "name": "iPad Pro",
                    "price": 26900,
                    "storage": 128,
                    "type": "iPad",
                    "qty":1,
                    "size": "9.7"
                  },
                  {
                    "id": "006",
                    "name": "iPad Pro",
                    "price": 30900,
                    "storage": 256,
                    "type": "iPad",
                    "qty":1,
                    "size": "9.7"
                  },
                  {
                    "id": "007",
                    "name": "iPad Air 2",
                    "price": 14400,
                    "storage": 32,
                    "type": "iPad",
                    "qty":1,
                    "size": "9.7"
                  },
                  {
                    "id": "008",
                    "name": "iPad Air 2",
                    "price": 18400,
                    "storage": 128,
                    "type": "iPad",
                    "qty":1,
                    "size": "9.7"
                  },
                  {
                    "id": "009",
                    "name": "iPad mini 4",
                    "price": 14400,
                    "storage": 32,
                    "type": "iPad",
                    "qty":1,
                    "size": "7.9"
                  },
                  {
                    "id": "010",
                    "name": "iPad mini 4",
                    "price": 18400,
                    "storage": 128,
                    "type": "iPad",
                    "qty":1,
                    "size": "7.9"
                  },
                  {
                    "id": "011",
                    "name": "iphone7",
                    "price": 26000,
                    "storage": 32,
                    "type": "iPhone",
                    "qty":1,
                    "size": "4.7"
                  },
                  {
                    "id": "012",
                    "name": "iphone7",
                    "price": 55000,
                    "storage": 128,
                    "type": "iPhone",
                    "qty":1,
                    "size": "4.7"
                  },
                  {
                    "id": "013",
                    "name": "iphone7Plus",
                    "price": 49000,
                    "storage": 32,
                    "type": "iPhone",
                    "qty":1,
                    "size": "5.5"
                  },{
                    "id": "014",
                    "name": "iphone7Plus",
                    "price": 59000,
                    "storage": 128,
                    "type": "iPhone",
                    "qty":1,
                    "size": "5.5"
                  },{
                    "id": "015",
                    "name": "iphone7Plus",
                    "price": 59000,
                    "storage": 128,
                    "type": "iPhone",
                    "qty":1,
                    "size": "5.5"
                  },{
                    "id": "016",
                    "name": "iphone7Plus",
                    "price": 59000,
                    "storage": 128,
                    "type": "iPhone",
                    "qty":1,
                    "size": "5.5"
                  },{
                    "id": "017",
                    "name": "iphone7Plus",
                    "price": 59000,
                    "storage": 128,
                    "type": "iPhone",
                    "qty":1,
                    "size": "5.5",
                  }
                ]
        },
        el: '#app',
        methods: {
               additems(){
                  console.log('---items to add---',this.additem)
                  let i;
                  for(i=0;i<this.additem;i++)  {
                     this.maincount++;
                     let ox = {
                        "id": this.maincount,
                        "name": "iphone7Plus",
                        "price": 59000,
                        "storage": 128,
                        "type": "iPhone",
                        "qty":i+1,
                        "size": "5.5",
                      };
                    
                     this.items.push(ox);
                  }
               },
                calfield(item,col) {
                    let digi = (col.decimal ? col.decimal: 0 );
                    if(item[col.field]) {
                         return ( digi ? item[col.field].toLocaleString('th-TH', {minimumFractionDigits: digi }) : item[col.field] );
                    } else {
                        return ( digi ? col.func(item.qty,item.price).toLocaleString('th-TH', {minimumFractionDigits: digi }) : col.func(item.qty,item.price) );
                    }
                },
                calculatotal(items) {
                    let total = items.reduce((o,i) =>o+(i.price*i.qty),0);
                    let vat = total*7/100;
                    return (total+vat).toLocaleString('th-TH', {minimumFractionDigits: 2 });
                },
                sumtotal(items) {
                   return items.reduce((o,i) => o+(i.price*i.qty),0).toLocaleString('th-TH', {minimumFractionDigits: 2 })
                },
                calcuvat(items,v=7) {
                    let total = items.reduce((o,i) =>o+(i.price*i.qty),0);
                    return (total* v/100).toLocaleString('th-TH', {minimumFractionDigits: 2 });
                },
                cssPagedMedia: (function () {
                    var style = document.createElement('style');
                    document.head.appendChild(style);
                    return function (rule) {
                        style.innerHTML = rule;
                    };
                }()),
                changecss(){
                    console.log('changecss')
                    this.cssPagedMedia.size = (size)=>{
                        this.cssPagedMedia('@page {size: ' + size + '}');
                    };
                    this.cssPagedMedia.size(this.pagesize);
                },
                printpage(){
                  window.print()        
                }
        },
    })