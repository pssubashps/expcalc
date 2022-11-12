Vue.createApp({
    data() {
        return {
            exp: [],
            company: '',
            startDate: '',
            endDate: '',
            total: '',
            totalMonth:'',
            index:false,
            isShowExp : false
        };
    },
    created: function(){
        this.loadData();
    },
    
    methods: {
        showDetails() {
            this.isShowExp = !this.isShowExp;
        },
        loadData() {
            let myData = localStorage.getItem("expData");
            if(myData) {
                myData = JSON.parse(myData);
                this.exp = myData;
                this.showExp();
            }
        },
        addExp() {
            console.log(this.company, this.startDate, this.endDate);
            const startArr = this.startDate.split('-');
            const endDateArr = this.endDate.split('-');
            this.startDate = `${startArr[1]}-${startArr[2]}-${startArr[0]}`;
            this.endDate = `${endDateArr[1]}-${endDateArr[2]}-${endDateArr[0]}`;
            const temp = {
                company: this.company,
                startDate: this.startDate,
                endDate: this.endDate
            };
            if(this.index === false) {
                this.exp.push(temp);
            }else{
                this.exp[this.index] = temp;
            }
           
            this.company = '';
            this.startDate = '';
            this.endDate = '';
            this.index = false;
            console.table(this.exp);
            this.showExp();
            localStorage.setItem("expData",JSON.stringify(this.exp));
           
            
        },
        deleteExp(index) {
            this.exp.splice(index, 1);
            localStorage.setItem("expData",JSON.stringify(this.exp));
            this.showExp();

        },
        editExp(index) {
            this.index = index;
            console.log( this.exp[index]);
            const startArr = this.exp[index].startDate.split('-');
            const endDateArr = this.exp[index].endDate.split('-');
            this.company = this.exp[index].company;
            this.startDate = `${startArr[2]}-${startArr[0]}-${startArr[1]}`;
            this.endDate = `${endDateArr[2]}-${endDateArr[0]}-${endDateArr[1]}`;
            this.$refs.company.focus()
        },
        showExp() {
            let totalExpTime = [];
            this.exp.forEach(e => {
                const d1 = new Date(e.startDate);
                const d2 = new Date(e.endDate);
                compExptime = this.totalExp(d1, d2);
                totalExpTime.push({ comapny: e.company, compExptime });
            });
            totalExpTime.forEach(t => {
                t.msg = this.calculate(t.compExptime);
            });
            let overall = 0;
            totalExpTime.forEach(t=>{
                overall = overall+t.compExptime;
             });
            const f =  this.calculate(overall);
            this.total = f[2];
            this.totalMonth = f[1];
        },
        totalExp(date1, date2) {
            return date2.getTime() - date1.getTime();
        },
        calculate(time) {
            const diff = time;
            // var secs = Math.floor(diff/1000);
            // var mins = Math.floor(secs/60);
            //  var hours = Math.floor(mins/60);
            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            console.log('days'+days);
          //  let months = Math.floor(days / 31);
            const years = Math.floor(days / 365.25);
            const remaingDays = Math.floor(days % 365.25);
           const  months = Math.floor(remaingDays / 31);
            days = Math.floor(days % 31);
            // hours = Math.floor(hours%24);
            // mins = Math.floor(mins%60);
            // secs = Math.floor(secs%60); 
            let message = `${days} days ${months} months  ${years} years `;

            return [days, months, years];
        }
    }
}).mount('#app');
