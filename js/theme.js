$ = jQuery;
// $('.owl-carousel').owlCarousel({
//     items: 1,
//     nav: true,
//     dots: true,
//     autoplay: true,
//     loop: true,
//     rtl: true,
//     //navText: ["<div class='nav-button owl-prev'></div>", "<div class='nav-button owl-next'></div>"],
// });

// $(document).ready(function () {
//     AnimateRotate(8);
// });


var urlParams = new URLSearchParams(window.location.search);
$(document).on('keydown', '.only-num, [type="tel"]', function (e) {
    var key = e.charCode || e.keyCode || 0;
    return (
        key === 8 ||
        key === 9 ||
        key === 13 ||
        key === 46 ||
        key === 110 ||
        key === 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
});

Vue.use(VuePersianDatetimePicker, {
    name: 'date-picker',
    props: {
        color: '#835ec1',
        autoSubmit: true,
        clearable: true,
    }
})


var DirectiveNumber = {
    bind: function (el, binding) {
        if (binding.value === false) return;
        el.addEventListener('input', function () {
            var value = el.value || '';
            var replaceArray = function (replaceString, find, replace) {
                var regex;
                for (var i = 0; i < find.length; i++) {
                    regex = new RegExp(find[i], 'g');
                    replaceString = replaceString.replace(regex, replace[i])
                }
                return replaceString;
            };

            // replace arabic and persian numbers
            var fa = '۰۱۲۳۴۵۶۷۸۹'.split('');
            var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
            var en = '0123456789'.split('');

            value = replaceArray(value, fa, en);
            value = replaceArray(value, ar, en);

            if (binding.modifiers && binding.modifiers.numeric) {
                value = value.replace(/\D/g, '')
            }

            if (el.value !== value) {
                var start = this.selectionStart,
                    end = this.selectionEnd;
                el.value = value;
                var event = new Event('input', {
                    bubbles: true,
                    cancelable: true
                });
                this.setSelectionRange(start, end);
                el.dispatchEvent(event)
            }
        })
    }
};

var ComponentInput = {
    template:
        '<div class="input-has-label" :class="{ focused: (focused || selfValue !== \'\') }">' +
        '<i class="b-top" :style="{ right: labelWidth }"></i>' +
        '<i class="b-bottom"></i>' +
        '<label :for="cid" ref="label">{{ label }}</label>' +
        '<input v-model="selfValue" ' +
        ':id="cid" ' +
        'ref="input" ' +
        'class="" ' +
        'v-bind="$attrs" ' +
        '@focus="focused=true" ' +
        '@blur="inputBlur" ' +
        '/>' +
        '<span v-if="tips && focused" class="tips">{{ tips }}</span>' +
        '</div>',
    props: {
        value: {type: String, default: ''},
        numeric: {type: Boolean, default: false},
        label: {type: String, default: ''},
        tips: {type: String, default: ''},
        id: {type: String, default: ''},
        min: {type: Number, default: undefined},
        max: {type: Number, default: undefined}
    },
    data: function () {
        return {
            selfValue: '',
            focused: false,
            labelWidth: 0
        }
    },
    computed: {
        cid: function () {
            return this.id || Math.random().toString().substr(3, 9)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (val) {
                this.selfValue = val
            }
        },
        selfValue(val, lasVal) {
            if (this.max !== undefined && val.length > this.max) {
                this.selfValue = lasVal
                val = lasVal
            }
            this.$emit('input', val)
        },
        focused: {
            immediate: true,
            handler: function () {
                var self = this;
                setTimeout(function () {
                    if (!self.$refs.label) return;
                    self.labelWidth = (self.$refs.label.offsetWidth + 28) + 'px'
                }, 400)
            }
        }
    },
    methods: {
        inputBlur: function () {
            this.$emit('validate')
            this.focused = false;
            // var val = this.selfValue;
            // if (val === '') return;
            /*if (this.min !== undefined && val * 1 < this.min) {
                this.selfValue = this.min
            }
            if (this.max !== undefined && val * 1 > this.max) {
                this.selfValue = this.max
            }*/
        },
        focus: function () {
            this.$refs.input.focus()
        },
        blur: function () {
            this.$refs.input.blur()
        }
    }
};

var CounterInput = {
    template:
        '<div class="input-has-label" :class="{ focused: (focused || selfValue !== \'\') }">' +
        '<i class="b-top" :style="{ right: labelWidth }"></i>' +
        '<i class="b-bottom"></i>' +
        '<label :for="cid" ref="label">{{ label }}</label>' +
        '<input v-model="selfValue" ' +
        ':id="cid" ' +
        'ref="input" ' +
        'class="" ' +
        'v-bind="$attrs" ' +
        '@focus="focused=true" ' +
        '@blur="inputBlur" ' +
        '/>' +
        '<span v-if="tips && focused" class="tips">{{ tips }}</span>' +
        `<div class="timer">
            <span class="bold-text">{{time | prettify}}</span>
        </div>`+
        '</div>',
    props: {
        value: {type: String, default: ''},
        numeric: {type: Boolean, default: false},
        label: {type: String, default: ''},
        tips: {type: String, default: ''},
        id: {type: String, default: ''},
        min: {type: Number, default: undefined},
        max: {type: Number, default: undefined},
        time: {type: Number, default: undefined}
    },
    data: function () {
        return {
            selfValue: '',
            focused: false,
            labelWidth: 0
        }
    },
    computed: {
        cid: function () {
            return this.id || Math.random().toString().substr(3, 9)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (val) {
                this.selfValue = val
            }
        },
        selfValue(val, lasVal) {
            if (this.max !== undefined && val.length > this.max) {
                this.selfValue = lasVal
                val = lasVal
            }
            this.$emit('input', val)
        },
        focused: {
            immediate: true,
            handler: function () {
                var self = this;
                setTimeout(function () {
                    if (!self.$refs.label) return;
                    self.labelWidth = (self.$refs.label.offsetWidth + 28) + 'px'
                }, 400)
            }
        }
    },
    methods: {
        inputBlur: function () {
            this.$emit('validate')
            this.focused = false;
        },
        focus: function () {
            this.$refs.input.focus()
        },
        blur: function () {
            this.$refs.input.blur()
        }
    },
    filters: {
        prettify : function(value) {
            let data = value.split(':')
            let minutes = data[0]
            let secondes = data[1]
            if (minutes < 10) {
                minutes = "0"+minutes
            }
            if (secondes < 10) {
                secondes = "0"+secondes
            }
            return minutes+":"+secondes
        }
    }
};

let Timer = {
    template: `
		 <div class="timer">
		 <small>زمان باقی مانده: </small>
		 <span class="bold-text">{{ time | prettify }}</span>
		 </div>
	`,
    props:['time'],
    filters: {
        prettify : function(value) {
            let data = value.split(':')
            let minutes = data[0]
            let secondes = data[1]
            if (minutes < 10) {
                minutes = "0"+minutes
            }
            if (secondes < 10) {
                secondes = "0"+secondes
            }
            return minutes+":"+secondes
        }
    }
}


Vue.directive('number', DirectiveNumber);


var app = new Vue({
    el: '#app',
    data: {
        packages: [],
        countryListCodeData: [],
        countryListSelectId: "IR",
        packagesSupport: [],
        packagesSupportSelectId: 1,
        packagesSports: [],
        packagesSportsSelectId: null,
        sliderStatus : false ,
        packageType: "",
        form: {
            gender: 'female',
            weight: '',
            age: '',
            wrist: '',
            height: '',
            name: '',
            family: '',
            phone: '',
            password: '',
            rePassword: '',
            date: '',
            time: '',
            packageSelectId: null,
            offerCode: null,
            offerCodeValid: true,
            payment_method: '',
            phoneDup: '',
            adviceType: 'whatsapp',
            hasUser: false,
            verify: "",
            isVerify: false,
            birthday: "",
            timer: null,
            timeStamp: 60,
            registerCode: false,
            offer_code_url: urlParams.get('offer'),
            offer_code_list: [
                "B444",
                "B500",
                "B700",
                "B333",
                "B222",
                "B111",
                "B900",
                "B800",
                "B600",
                "B300",
                "B200",
                "B100",
            ],
            offer_code_valid: true,
            token: '',
            card_payment_img_url: '',
            card_payment_id: ''

        },
        result: {
            bmi: 0,
            bmiPro: 0,
            status: '',
            months: '',
            weight: 0,
            dietType: '',
            fitnessWeight: 0,
            healthWeight: 0,
            normalWeight: 0,
            overWeight: 0,
            normalAbdomen: 0,
            chart: {
                title: "کمبود وزن",
                img: "./assets/images/bmi/men/1underweight_men.svg",
                holder: "./assets/images/bmi/holder/1underweight_holder.svg"
            }
        },
        response: {
            msg: '',
            user: '',
            bPrice: '',
            fPrice: '',
            bId: '',
            fId: '',
            paymentResponse: ''
        },
        step: 1,
        childStep: 1,
        loading: false,
        formInputList: {},
        submitStatus: 'none',
        dateTime: '',
        validSupport : null,
        userInfo: {
            ip: "",
            country_code: "",
            phone: '',
            name: '',
            family: '',
            gender: '',
            age: '',
            overWeight: 0,
            bmi: '',
            repository: '',
            topic: '',
            crm_status: 1,
            position: '',
            referrer: document.referrer,
            page_path: 'guarantee',
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content'),
            payment: {
                phone: '',
                product: '',
                credit: '',
                payment_date: null,
                payment_method: null
            }
        }
    },
    async created() {
        this.defaultFormInput()
        this.basePackage()
        this.basePackageSupport()
        this.basePackageSports()
        this.baseCountryList()
        await this.getDateTime()
        this.showSupport()
    },
    methods: {
        basePackage() {
            this.packages = [
                {
                    id: 1,
                    title: "رژیم کاهش وزن",
                    description: ['12کیلو لاغری در 3ماه', 'عضویت در ماراتن لاغری گروهی', 'همراه با پشتیبان', 'برنامه غذایی مختص لاغری'],
                    price: 390,
                    offerPrice: 360,
                    product_id: 48,
                    offer: true,
                    checked: false,
                    discount: 390 - 360,
                    offer_count: Math.round(((390 - 360)/390)*100),
                    amount: 360 * 10000,
                    type: "kahesh"
                },
                {
                    id: 2,
                    title: "رژیم کاهش وزن + برنامه ورزشی",
                    description: ['14کیلو لاغری در 3ماه', 'عضویت در ماراتن لاغری گروهی', 'همراه با پشتیبان', 'ویدئوهای آموزش حرکات ورزشی', 'برنامه ورزشی مختص لاغری شکم و پهلو'],
                    price: 490,
                    offerPrice: 460,
                    product_id: 49,
                    offer: true,
                    checked: false,
                    discount: 490 - 460,
                    offer_count: Math.round(((490 - 460)/490)*100),
                    amount: 460 * 10000,
                    type: "kahesh"
                },
                {
                    id: 3,
                    title: "رژیم 3ماهه افزایش وزن",
                    description: ['عضویت در ماراتن لاغری گروهی', 'پشتیبانی اختصاصی متخصص تغذیه'],
                    price: 425,
                    offerPrice: 375,
                    product_id: 48,
                    offer: true,
                    checked: false,
                    discount: 425 - 375,
                    offer_count: Math.round(((425 - 375)/425)*100),
                    amount: 375 * 10000,
                    type: "afzayesh"
                },
                {
                    id: 4,
                    title: "رژیم 3ماهه تثبیت وزن",
                    description: ['عضویت در ماراتن لاغری گروهی', 'پشتیبانی اختصاصی متخصص تغذیه'],
                    price: 425,
                    offerPrice: 375,
                    product_id: 48,
                    offer: true,
                    checked: false,
                    discount: 375 - 325,
                    offer_count: Math.round(((425 - 375)/425)*100),
                    amount: 375 * 10000,
                    type: "tasbit"
                },
                {
                    id: 5,
                    title: "رژیم 3ماهه تثبیت وزن + برنامه ورزشی",
                    description: ['عضویت در ماراتن لاغری گروهی', 'پشتیبانی اختصاصی متخصص تغذیه', 'ویدئوهای اختصاصی آموزش حرکات ورزشی'],
                    price: 675,
                    offerPrice: 475,
                    product_id: 49,
                    offer: true,
                    checked: false,
                    discount: 675 - 475,
                    offer_count: Math.round(((675 - 475)/675)*100),
                    amount: 475 * 10000,
                    type: "tasbit"
                },
            ];
            this.packages = [
                {
                    type: "kahesh",
                    products: [
                        {
                            id: 1,
                            title: "رژیم 1ماهه کاهش وزن",
                            description: ['4 تا 5 کیلو لاغری', 'عضویت در ماراتن لاغری گروهی'],
                            price: {
                                amount: 200,
                                offer: 0
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 45,
                                            offer: 45
                                        },
                                        product_id: 42
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 100,
                                            offer: 50
                                        },
                                        product_id: 14
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 50,
                                            offer: 0
                                        },
                                        product_id: 46
                                    }
                                ]
                            },
                            product_id: 33,
                            status: true,
                            type: "1month"

                        },
                        {
                            id: 2,
                            title: "رژیم 3ماهه کاهش وزن",
                            description: ['10 تا 14 کیلو لاغری', 'عضویت در ماراتن لاغری گروهی', 'امکان دریافت رژیم تثبیت'],
                            price: {
                                amount: 390,
                                offer: 30
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 85,
                                            offer: 85
                                        },
                                        product_id: 48
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 155,
                                            offer: 75
                                        },
                                        product_id: 3
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 100,
                                            offer: 0
                                        },
                                        product_id: 49
                                    }
                                ]
                            },
                            product_id: 32,
                            status: true,
                            type: "3month"
                        },
                        {
                            id: 3,
                            title: "رژیم 6ماهه کاهش وزن",
                            description: ['20 تا 28 کیلو لاغری', 'عضویت در ماراتن لاغری گروهی', 'امکان دریافت رژیم تثبیت'],
                            price: {
                                amount: 780,
                                offer: 100
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 170,
                                            offer: 170
                                        },
                                        product_id: 53
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 300,
                                            offer: 185
                                        },
                                        product_id: 51
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 200,
                                            offer: 100
                                        },
                                        product_id: 54
                                    }
                                ]
                            },
                            product_id: 52,
                            status: true,
                            type: "6month"
                        }
                    ]
                },
                {
                    type: "afzayesh",
                    products: [
                        {
                            id: 1,
                            title: "رژیم 1ماهه افزایش وزن",
                            description: ['افزایش اصولی وزن', 'عضویت در ماراتن گروهی', 'انتخاب وعده غذایی دلخواه'],
                            price: {
                                amount: 200,
                                offer: 0
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 45,
                                            offer: 45
                                        },
                                        product_id: 42
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 100,
                                            offer: 50
                                        },
                                        product_id: 14
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 50,
                                            offer: 0
                                        },
                                        product_id: 46
                                    }
                                ]
                            },
                            product_id: 33,
                            status: false,
                            type: "1month"

                        },
                        {
                            id: 2,
                            title: "رژیم 3ماهه افزایش وزن",
                            description: ['افزایش اصولی وزن', 'عضویت در ماراتن گروهی', 'انتخاب وعده غذایی دلخواه'],
                            price: {
                                amount: 390,
                                offer: 30
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 85,
                                            offer: 85
                                        },
                                        product_id: 48
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 155,
                                            offer: 75
                                        },
                                        product_id: 3
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "ورزشی",
                                        description: [],
                                        price: {
                                            amount: 100,
                                            offer: 0
                                        },
                                        product_id: 49
                                    }
                                ]
                            },
                            product_id: 32,
                            status: true,
                            type: "3month"
                        },
                        {
                            id: 3,
                            title: "رژیم 6ماهه افزایش وزن",
                            description: ['افزایش اصولی وزن', 'عضویت در ماراتن گروهی', 'انتخاب وعده غذایی دلخواه'],
                            price: {
                                amount: 780,
                                offer: 100
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 170,
                                            offer: 170
                                        },
                                        product_id: 53
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 300,
                                            offer: 185
                                        },
                                        product_id: 51
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "ورزشی",
                                        description: [],
                                        price: {
                                            amount: 200,
                                            offer: 100
                                        },
                                        product_id: 54
                                    }
                                ]
                            },
                            product_id: 52,
                            status: false,
                            type: "6month"
                        }
                    ]
                },
                {
                    type: "tasbit",
                    products: [
                        {
                            id: 1,
                            title: "رژیم 1ماهه تثبیت وزن",
                            description: ['عضویت در ماراتن گروهی', 'اصلاح سبک زندگی و جلوگیری از بازگشت وزن'],
                            price: {
                                amount: 200,
                                offer: 0
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 45,
                                            offer: 45
                                        },
                                        product_id: 42
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 100,
                                            offer: 50
                                        },
                                        product_id: 14
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 50,
                                            offer: 0
                                        },
                                        product_id: 46
                                    }
                                ]
                            },
                            product_id: 33,
                            status: false

                        },
                        {
                            id: 2,
                            title: "رژیم 3ماهه تثبیت وزن",
                            description: ['عضویت در ماراتن گروهی', 'اصلاح سبک زندگی و جلوگیری از بازگشت وزن'],
                            price: {
                                amount: 390,
                                offer: 30
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 85,
                                            offer: 85
                                        },
                                        product_id: 48
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 155,
                                            offer: 75
                                        },
                                        product_id: 3
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 100,
                                            offer: 0
                                        },
                                        product_id: 49
                                    }
                                ]
                            },
                            product_id: 32,
                            status: true
                        },
                        {
                            id: 3,
                            title: "رژیم 6ماهه تثبیت وزن",
                            description: ['عضویت در ماراتن گروهی', 'اصلاح سبک زندگی و جلوگیری از بازگشت وزن'],
                            price: {
                                amount: 780,
                                offer: 100
                            },
                            option: {
                                support: [
                                    {
                                        id: 1,
                                        title: "پشتیبان",
                                        description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                                        price: {
                                            amount: 170,
                                            offer: 170
                                        },
                                        product_id: 53
                                    },
                                    {
                                        id: 2,
                                        title: "پشتیبان اختصاصی",
                                        description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                                        price: {
                                            amount: 300,
                                            offer: 185
                                        },
                                        product_id: 51
                                    },
                                ],
                                exercise: [
                                    {
                                        id: 1,
                                        title: "برنامه ورزشی",
                                        description: ['برنامه ورزشی مختص لاغری شکم و پهلو', 'ویدئوهای آموزش حرکات ورزشی', 'سهمیه غذایی اضافه', 'افزایش سرعت چربی‌سوزی'],
                                        price: {
                                            amount: 200,
                                            offer: 100
                                        },
                                        product_id: 54
                                    }
                                ]
                            },
                            product_id: 52,
                            status: false
                        }
                    ]
                },
            ]
        },
        basePackageSupport() {
            this.packagesSupport = [
                {
                    id: 1,
                    title: "پشتیبان",
                    description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                    price: 85,
                    offerPrice: 0,
                    product_id: 33,
                    offer: true,
                    discount: 85 - 85,
                    offer_count: 100,
                    amount: 0 * 10000,
                },
                {
                    id: 2,
                    title: "پشتیبان اختصاصی",
                    description: ['پشتیبانی متخصص تغذیه', 'پشتیبانی به صورت اختصاصی', 'امکان ارتباط سریع و آسان در پیام رسان'],
                    price: 155,
                    offerPrice: 65,
                    product_id: 32,
                    offer: true,
                    discount: 155 - 95,
                    offer_count: Math.round(((155 - 65)/155)*100),
                    amount: 65 * 10000,
                },
            ]

            this.packagesSupport = [
                {
                    id: 1,
                    title: "پشتیبان",
                    description: [],
                    price: {
                        amount: 45,
                        offer: 45
                    },
                },
                {
                    id: 2,
                    title: "پشتیبان اختصاصی",
                    description: [],
                    price: {
                        amount: 100,
                        offer: 50
                    },
                },
            ]
        },
        basePackageSports() {
            this.packagesSports = [
                {
                    id: 1,
                    title: "رژیم همراه با ورزش",
                    description: ['پشتیبانی کال سنتر', 'امکان تماس تلفنی با پشتیبان'],
                    price: 85,
                    offerPrice: 45,
                    product_id: 33,
                    offer: true,
                    discount: 85 - 45,
                    offer_count: Math.round(((85 - 45)/85)*100),
                    amount: 45 * 10000,
                },
            ]

            this.packagesSports = [
                {
                    id: 1,
                    title: "ورزشی",
                    description: [],
                    price: {
                        amount: 50,
                        offer: 0
                    },
                }
            ]
        },
        baseCountryList(){
            this.countryListCodeData = [
                {
                    name: "Afghanistan",
                    code: "AF",
                    id: 1,
                    mobileCode: 93,
                    continent: "Asia",
                    alpha_3: "AFG",
                    regex: null,
                    active: true
                },
                {
                    name: "Aland Islands",
                    code: "AX",
                    id: 2,
                    mobileCode: 358,
                    continent: "Europe",
                    alpha_3: "ALA",
                    regex: null,
                    active: true
                },
                {
                    name: "Albania",
                    code: "AL",
                    id: 3,
                    mobileCode: 355,
                    continent: "Europe",
                    alpha_3: "ALB",
                    regex: null,
                    active: true
                },
                {
                    name: "Algeria",
                    code: "DZ",
                    id: 4,
                    mobileCode: 213,
                    continent: "Africa",
                    alpha_3: "DZA",
                    regex: null,
                    active: true
                },
                {
                    name: "American Samoa",
                    code: "AS",
                    id: 5,
                    mobileCode: 1684,
                    continent: "Oceania",
                    alpha_3: "ASM",
                    regex: null,
                    active: true
                },
                {
                    name: "Andorra",
                    code: "AD",
                    id: 6,
                    mobileCode: 376,
                    continent: "Europe",
                    alpha_3: "AND",
                    regex: null,
                    active: true
                },
                {
                    name: "Angola",
                    code: "AO",
                    id: 7,
                    mobileCode: 244,
                    continent: "Africa",
                    alpha_3: "AGO",
                    regex: null,
                    active: true
                },
                {
                    name: "Anguilla",
                    code: "AI",
                    id: 8,
                    mobileCode: 1264,
                    continent: "North America",
                    alpha_3: "AIA",
                    regex: null,
                    active: true
                },
                {
                    name: "Antarctica",
                    code: "AQ",
                    id: 9,
                    mobileCode: 672,
                    continent: "Antarctica",
                    alpha_3: "ATA",
                    regex: null,
                    active: true
                },
                {
                    name: "Antigua and Barbuda",
                    code: "AG",
                    id: 10,
                    mobileCode: 1268,
                    continent: "North America",
                    alpha_3: "ATG",
                    regex: null,
                    active: true
                },
                {
                    name: "Argentina",
                    code: "AR",
                    id: 11,
                    mobileCode: 54,
                    continent: "South America",
                    alpha_3: "ARG",
                    regex: null,
                    active: true
                },
                {
                    name: "Armenia",
                    code: "AM",
                    id: 12,
                    mobileCode: 374,
                    continent: "Asia",
                    alpha_3: "ARM",
                    regex: null,
                    active: true
                },
                {
                    name: "Aruba",
                    code: "AW",
                    id: 13,
                    mobileCode: 297,
                    continent: "North America",
                    alpha_3: "ABW",
                    regex: null,
                    active: true
                },
                {
                    name: "Australia",
                    code: "AU",
                    id: 14,
                    mobileCode: 61,
                    continent: "Oceania",
                    alpha_3: "AUS",
                    regex: null,
                    active: true
                },
                {
                    name: "Austria",
                    code: "AT",
                    id: 15,
                    mobileCode: 43,
                    continent: "Europe",
                    alpha_3: "AUT",
                    regex: null,
                    active: true
                },
                {
                    name: "Azerbaijan",
                    code: "AZ",
                    id: 16,
                    mobileCode: 994,
                    continent: "Asia",
                    alpha_3: "AZE",
                    regex: null,
                    active: true
                },
                {
                    name: "Bahamas",
                    code: "BS",
                    id: 17,
                    mobileCode: 1242,
                    continent: "North America",
                    alpha_3: "BHS",
                    regex: null,
                    active: true
                },
                {
                    name: "Bahrain",
                    code: "BH",
                    id: 18,
                    mobileCode: 973,
                    continent: "Asia",
                    alpha_3: "BHR",
                    regex: null,
                    active: true
                },
                {
                    name: "Bangladesh",
                    code: "BD",
                    id: 19,
                    mobileCode: 880,
                    continent: "Asia",
                    alpha_3: "BGD",
                    regex: null,
                    active: true
                },
                {
                    name: "Barbados",
                    code: "BB",
                    id: 20,
                    mobileCode: 1246,
                    continent: "North America",
                    alpha_3: "BRB",
                    regex: null,
                    active: true
                },
                {
                    name: "Belarus",
                    code: "BY",
                    id: 21,
                    mobileCode: 375,
                    continent: "Europe",
                    alpha_3: "BLR",
                    regex: null,
                    active: true
                },
                {
                    name: "Belgium",
                    code: "BE",
                    id: 22,
                    mobileCode: 32,
                    continent: "Europe",
                    alpha_3: "BEL",
                    regex: null,
                    active: true
                },
                {
                    name: "Belize",
                    code: "BZ",
                    id: 23,
                    mobileCode: 501,
                    continent: "North America",
                    alpha_3: "BLZ",
                    regex: null,
                    active: true
                },
                {
                    name: "Benin",
                    code: "BJ",
                    id: 24,
                    mobileCode: 229,
                    continent: "Africa",
                    alpha_3: "BEN",
                    regex: null,
                    active: true
                },
                {
                    name: "Bermuda",
                    code: "BM",
                    id: 25,
                    mobileCode: 1441,
                    continent: "North America",
                    alpha_3: "BMU",
                    regex: null,
                    active: true
                },
                {
                    name: "Bhutan",
                    code: "BT",
                    id: 26,
                    mobileCode: 975,
                    continent: "Asia",
                    alpha_3: "BTN",
                    regex: null,
                    active: true
                },
                {
                    name: "Bolivia",
                    code: "BO",
                    id: 27,
                    mobileCode: 591,
                    continent: "South America",
                    alpha_3: "BOL",
                    regex: null,
                    active: true
                },
                {
                    name: "Bonaire, Sint Eustatius and Saba",
                    code: "BQ",
                    id: 28,
                    mobileCode: 599,
                    continent: "North America",
                    alpha_3: "BES",
                    regex: null,
                    active: true
                },
                {
                    name: "Bosnia and Herzegovina",
                    code: "BA",
                    id: 29,
                    mobileCode: 387,
                    continent: "Europe",
                    alpha_3: "BIH",
                    regex: null,
                    active: true
                },
                {
                    name: "Botswana",
                    code: "BW",
                    id: 30,
                    mobileCode: 267,
                    continent: "Africa",
                    alpha_3: "BWA",
                    regex: null,
                    active: true
                },
                {
                    name: "Bouvet Island",
                    code: "BV",
                    id: 31,
                    mobileCode: 55,
                    continent: "Antarctica",
                    alpha_3: "BVT",
                    regex: null,
                    active: true
                },
                {
                    name: "Brazil",
                    code: "BR",
                    id: 32,
                    mobileCode: 55,
                    continent: "South America",
                    alpha_3: "BRA",
                    regex: null,
                    active: true
                },
                {
                    name: "British Indian Ocean Territory",
                    code: "IO",
                    id: 33,
                    mobileCode: 246,
                    continent: "Asia",
                    alpha_3: "IOT",
                    regex: null,
                    active: true
                },
                {
                    name: "Brunei Darussalam",
                    code: "BN",
                    id: 34,
                    mobileCode: 673,
                    continent: "Asia",
                    alpha_3: "BRN",
                    regex: null,
                    active: true
                },
                {
                    name: "Bulgaria",
                    code: "BG",
                    id: 35,
                    mobileCode: 359,
                    continent: "Europe",
                    alpha_3: "BGR",
                    regex: null,
                    active: true
                },
                {
                    name: "Burkina Faso",
                    code: "BF",
                    id: 36,
                    mobileCode: 226,
                    continent: "Africa",
                    alpha_3: "BFA",
                    regex: null,
                    active: true
                },
                {
                    name: "Burundi",
                    code: "BI",
                    id: 37,
                    mobileCode: 257,
                    continent: "Africa",
                    alpha_3: "BDI",
                    regex: null,
                    active: true
                },
                {
                    name: "Cambodia",
                    code: "KH",
                    id: 38,
                    mobileCode: 855,
                    continent: "Asia",
                    alpha_3: "KHM",
                    regex: null,
                    active: true
                },
                {
                    name: "Cameroon",
                    code: "CM",
                    id: 39,
                    mobileCode: 237,
                    continent: "Africa",
                    alpha_3: "CMR",
                    regex: null,
                    active: true
                },
                {
                    name: "Canada",
                    code: "CA",
                    id: 40,
                    mobileCode: 1,
                    continent: "North America",
                    alpha_3: "CAN",
                    regex: null,
                    active: true
                },
                {
                    name: "Cape Verde",
                    code: "CV",
                    id: 41,
                    mobileCode: 238,
                    continent: "Africa",
                    alpha_3: "CPV",
                    regex: null,
                    active: true
                },
                {
                    name: "Cayman Islands",
                    code: "KY",
                    id: 42,
                    mobileCode: 1345,
                    continent: "North America",
                    alpha_3: "CYM",
                    regex: null,
                    active: true
                },
                {
                    name: "Central African Republic",
                    code: "CF",
                    id: 43,
                    mobileCode: 236,
                    continent: "Africa",
                    alpha_3: "CAF",
                    regex: null,
                    active: true
                },
                {
                    name: "Chad",
                    code: "TD",
                    id: 44,
                    mobileCode: 235,
                    continent: "Africa",
                    alpha_3: "TCD",
                    regex: null,
                    active: true
                },
                {
                    name: "Chile",
                    code: "CL",
                    id: 45,
                    mobileCode: 56,
                    continent: "South America",
                    alpha_3: "CHL",
                    regex: null,
                    active: true
                },
                {
                    name: "China",
                    code: "CN",
                    id: 46,
                    mobileCode: 86,
                    continent: "Asia",
                    alpha_3: "CHN",
                    regex: null,
                    active: true
                },
                {
                    name: "Christmas Island",
                    code: "CX",
                    id: 47,
                    mobileCode: 61,
                    continent: "Asia",
                    alpha_3: "CXR",
                    regex: null,
                    active: true
                },
                {
                    name: "Cocos (Keeling) Islands",
                    code: "CC",
                    id: 48,
                    mobileCode: 672,
                    continent: "Asia",
                    alpha_3: "CCK",
                    regex: null,
                    active: true
                },
                {
                    name: "Colombia",
                    code: "CO",
                    id: 49,
                    mobileCode: 57,
                    continent: "South America",
                    alpha_3: "COL",
                    regex: null,
                    active: true
                },
                {
                    name: "Comoros",
                    code: "KM",
                    id: 50,
                    mobileCode: 269,
                    continent: "Africa",
                    alpha_3: "COM",
                    regex: null,
                    active: true
                },
                {
                    name: "Congo",
                    code: "CG",
                    id: 51,
                    mobileCode: 242,
                    continent: "Africa",
                    alpha_3: "COG",
                    regex: null,
                    active: true
                },
                {
                    name: "Congo, Democratic Republic of the Congo",
                    code: "CD",
                    id: 52,
                    mobileCode: 242,
                    continent: "Africa",
                    alpha_3: "COD",
                    regex: null,
                    active: true
                },
                {
                    name: "Cook Islands",
                    code: "CK",
                    id: 53,
                    mobileCode: 682,
                    continent: "Oceania",
                    alpha_3: "COK",
                    regex: null,
                    active: true
                },
                {
                    name: "Costa Rica",
                    code: "CR",
                    id: 54,
                    mobileCode: 506,
                    continent: "North America",
                    alpha_3: "CRI",
                    regex: null,
                    active: true
                },
                {
                    name: "Cote D'Ivoire",
                    code: "CI",
                    id: 55,
                    mobileCode: 225,
                    continent: "Africa",
                    alpha_3: "CIV",
                    regex: null,
                    active: true
                },
                {
                    name: "Croatia",
                    code: "HR",
                    id: 56,
                    mobileCode: 385,
                    continent: "Europe",
                    alpha_3: "HRV",
                    regex: null,
                    active: true
                },
                {
                    name: "Cuba",
                    code: "CU",
                    id: 57,
                    mobileCode: 53,
                    continent: "North America",
                    alpha_3: "CUB",
                    regex: null,
                    active: true
                },
                {
                    name: "Curacao",
                    code: "CW",
                    id: 58,
                    mobileCode: 599,
                    continent: "North America",
                    alpha_3: "CUW",
                    regex: null,
                    active: true
                },
                {
                    name: "Cyprus",
                    code: "CY",
                    id: 59,
                    mobileCode: 357,
                    continent: "Asia",
                    alpha_3: "CYP",
                    regex: null,
                    active: true
                },
                {
                    name: "Czech Republic",
                    code: "CZ",
                    id: 60,
                    mobileCode: 420,
                    continent: "Europe",
                    alpha_3: "CZE",
                    regex: null,
                    active: true
                },
                {
                    name: "Denmark",
                    code: "DK",
                    id: 61,
                    mobileCode: 45,
                    continent: "Europe",
                    alpha_3: "DNK",
                    regex: null,
                    active: true
                },
                {
                    name: "Djibouti",
                    code: "DJ",
                    id: 62,
                    mobileCode: 253,
                    continent: "Africa",
                    alpha_3: "DJI",
                    regex: null,
                    active: true
                },
                {
                    name: "Dominica",
                    code: "DM",
                    id: 63,
                    mobileCode: 1767,
                    continent: "North America",
                    alpha_3: "DMA",
                    regex: null,
                    active: true
                },
                {
                    name: "Dominican Republic",
                    code: "DO",
                    id: 64,
                    mobileCode: 1809,
                    continent: "North America",
                    alpha_3: "DOM",
                    regex: null,
                    active: true
                },
                {
                    name: "Ecuador",
                    code: "EC",
                    id: 65,
                    mobileCode: 593,
                    continent: "South America",
                    alpha_3: "ECU",
                    regex: null,
                    active: true
                },
                {
                    name: "Egypt",
                    code: "EG",
                    id: 66,
                    mobileCode: 20,
                    continent: "Africa",
                    alpha_3: "EGY",
                    regex: null,
                    active: true
                },
                {
                    name: "El Salvador",
                    code: "SV",
                    id: 67,
                    mobileCode: 503,
                    continent: "North America",
                    alpha_3: "SLV",
                    regex: null,
                    active: true
                },
                {
                    name: "Equatorial Guinea",
                    code: "GQ",
                    id: 68,
                    mobileCode: 240,
                    continent: "Africa",
                    alpha_3: "GNQ",
                    regex: null,
                    active: true
                },
                {
                    name: "Eritrea",
                    code: "ER",
                    id: 69,
                    mobileCode: 291,
                    continent: "Africa",
                    alpha_3: "ERI",
                    regex: null,
                    active: true
                },
                {
                    name: "Estonia",
                    code: "EE",
                    id: 70,
                    mobileCode: 372,
                    continent: "Europe",
                    alpha_3: "EST",
                    regex: null,
                    active: true
                },
                {
                    name: "Ethiopia",
                    code: "ET",
                    id: 71,
                    mobileCode: 251,
                    continent: "Africa",
                    alpha_3: "ETH",
                    regex: null,
                    active: true
                },
                {
                    name: "Falkland Islands (Malvinas)",
                    code: "FK",
                    id: 72,
                    mobileCode: 500,
                    continent: "South America",
                    alpha_3: "FLK",
                    regex: null,
                    active: true
                },
                {
                    name: "Faroe Islands",
                    code: "FO",
                    id: 73,
                    mobileCode: 298,
                    continent: "Europe",
                    alpha_3: "FRO",
                    regex: null,
                    active: true
                },
                {
                    name: "Fiji",
                    code: "FJ",
                    id: 74,
                    mobileCode: 679,
                    continent: "Oceania",
                    alpha_3: "FJI",
                    regex: null,
                    active: true
                },
                {
                    name: "Finland",
                    code: "FI",
                    id: 75,
                    mobileCode: 358,
                    continent: "Europe",
                    alpha_3: "FIN",
                    regex: null,
                    active: true
                },
                {
                    name: "France",
                    code: "FR",
                    id: 76,
                    mobileCode: 33,
                    continent: "Europe",
                    alpha_3: "FRA",
                    regex: null,
                    active: true
                },
                {
                    name: "French Guiana",
                    code: "GF",
                    id: 77,
                    mobileCode: 594,
                    continent: "South America",
                    alpha_3: "GUF",
                    regex: null,
                    active: true
                },
                {
                    name: "French Polynesia",
                    code: "PF",
                    id: 78,
                    mobileCode: 689,
                    continent: "Oceania",
                    alpha_3: "PYF",
                    regex: null,
                    active: true
                },
                {
                    name: "French Southern Territories",
                    code: "TF",
                    id: 79,
                    mobileCode: 262,
                    continent: "Antarctica",
                    alpha_3: "ATF",
                    regex: null,
                    active: true
                },
                {
                    name: "Gabon",
                    code: "GA",
                    id: 80,
                    mobileCode: 241,
                    continent: "Africa",
                    alpha_3: "GAB",
                    regex: null,
                    active: true
                },
                {
                    name: "Gambia",
                    code: "GM",
                    id: 81,
                    mobileCode: 220,
                    continent: "Africa",
                    alpha_3: "GMB",
                    regex: null,
                    active: true
                },
                {
                    name: "Georgia",
                    code: "GE",
                    id: 82,
                    mobileCode: 995,
                    continent: "Asia",
                    alpha_3: "GEO",
                    regex: null,
                    active: true
                },
                {
                    name: "Germany",
                    code: "DE",
                    id: 83,
                    mobileCode: 49,
                    continent: "Europe",
                    alpha_3: "DEU",
                    regex: null,
                    active: true
                },
                {
                    name: "Ghana",
                    code: "GH",
                    id: 84,
                    mobileCode: 233,
                    continent: "Africa",
                    alpha_3: "GHA",
                    regex: null,
                    active: true
                },
                {
                    name: "Gibraltar",
                    code: "GI",
                    id: 85,
                    mobileCode: 350,
                    continent: "Europe",
                    alpha_3: "GIB",
                    regex: null,
                    active: true
                },
                {
                    name: "Greece",
                    code: "GR",
                    id: 86,
                    mobileCode: 30,
                    continent: "Europe",
                    alpha_3: "GRC",
                    regex: null,
                    active: true
                },
                {
                    name: "Greenland",
                    code: "GL",
                    id: 87,
                    mobileCode: 299,
                    continent: "North America",
                    alpha_3: "GRL",
                    regex: null,
                    active: true
                },
                {
                    name: "Grenada",
                    code: "GD",
                    id: 88,
                    mobileCode: 1473,
                    continent: "North America",
                    alpha_3: "GRD",
                    regex: null,
                    active: true
                },
                {
                    name: "Guadeloupe",
                    code: "GP",
                    id: 89,
                    mobileCode: 590,
                    continent: "North America",
                    alpha_3: "GLP",
                    regex: null,
                    active: true
                },
                {
                    name: "Guam",
                    code: "GU",
                    id: 90,
                    mobileCode: 1671,
                    continent: "Oceania",
                    alpha_3: "GUM",
                    regex: null,
                    active: true
                },
                {
                    name: "Guatemala",
                    code: "GT",
                    id: 91,
                    mobileCode: 502,
                    continent: "North America",
                    alpha_3: "GTM",
                    regex: null,
                    active: true
                },
                {
                    name: "Guernsey",
                    code: "GG",
                    id: 92,
                    mobileCode: 44,
                    continent: "Europe",
                    alpha_3: "GGY",
                    regex: null,
                    active: true
                },
                {
                    name: "Guinea",
                    code: "GN",
                    id: 93,
                    mobileCode: 224,
                    continent: "Africa",
                    alpha_3: "GIN",
                    regex: null,
                    active: true
                },
                {
                    name: "Guinea-Bissau",
                    code: "GW",
                    id: 94,
                    mobileCode: 245,
                    continent: "Africa",
                    alpha_3: "GNB",
                    regex: null,
                    active: true
                },
                {
                    name: "Guyana",
                    code: "GY",
                    id: 95,
                    mobileCode: 592,
                    continent: "South America",
                    alpha_3: "GUY",
                    regex: null,
                    active: true
                },
                {
                    name: "Haiti",
                    code: "HT",
                    id: 96,
                    mobileCode: 509,
                    continent: "North America",
                    alpha_3: "HTI",
                    regex: null,
                    active: true
                },
                {
                    name: "Heard Island and Mcdonald Islands",
                    code: "HM",
                    id: 97,
                    mobileCode: 0,
                    continent: "Antarctica",
                    alpha_3: "HMD",
                    regex: null,
                    active: true
                },
                {
                    name: "Holy See (Vatican City State)",
                    code: "VA",
                    id: 98,
                    mobileCode: 39,
                    continent: "Europe",
                    alpha_3: "VAT",
                    regex: null,
                    active: true
                },
                {
                    name: "Honduras",
                    code: "HN",
                    id: 99,
                    mobileCode: 504,
                    continent: "North America",
                    alpha_3: "HND",
                    regex: null,
                    active: true
                },
                {
                    name: "Hong Kong",
                    code: "HK",
                    id: 100,
                    mobileCode: 852,
                    continent: "Asia",
                    alpha_3: "HKG",
                    regex: null,
                    active: true
                },
                {
                    name: "Hungary",
                    code: "HU",
                    id: 101,
                    mobileCode: 36,
                    continent: "Europe",
                    alpha_3: "HUN",
                    regex: null,
                    active: true
                },
                {
                    name: "Iceland",
                    code: "IS",
                    id: 102,
                    mobileCode: 354,
                    continent: "Europe",
                    alpha_3: "ISL",
                    regex: null,
                    active: true
                },
                {
                    name: "India",
                    code: "IN",
                    id: 103,
                    mobileCode: 91,
                    continent: "Asia",
                    alpha_3: "IND",
                    regex: null,
                    active: true
                },
                {
                    name: "Indonesia",
                    code: "ID",
                    id: 104,
                    mobileCode: 62,
                    continent: "Asia",
                    alpha_3: "IDN",
                    regex: null,
                    active: true
                },
                {
                    name: "Iran, Islamic Republic of",
                    code: "IR",
                    id: 105,
                    mobileCode: 98,
                    continent: "Asia",
                    alpha_3: "IRN",
                    regex: /^(|0)?9\d{9}$/,
                    active: true
                },
                {
                    name: "Iraq",
                    code: "IQ",
                    id: 106,
                    mobileCode: 964,
                    continent: "Asia",
                    alpha_3: "IRQ",
                    regex: null,
                    active: true
                },
                {
                    name: "Ireland",
                    code: "IE",
                    id: 107,
                    mobileCode: 353,
                    continent: "Europe",
                    alpha_3: "IRL",
                    regex: null,
                    active: true
                },
                {
                    name: "Isle of Man",
                    code: "IM",
                    id: 108,
                    mobileCode: 44,
                    continent: "Europe",
                    alpha_3: "IMN",
                    regex: null,
                    active: true
                },
                {
                    name: "Israel",
                    code: "IL",
                    id: 109,
                    mobileCode: 972,
                    continent: "Asia",
                    alpha_3: "ISR",
                    regex: null,
                    active: true
                },
                {
                    name: "Italy",
                    code: "IT",
                    id: 110,
                    mobileCode: 39,
                    continent: "Europe",
                    alpha_3: "ITA",
                    regex: null,
                    active: true
                },
                {
                    name: "Jamaica",
                    code: "JM",
                    id: 111,
                    mobileCode: 1876,
                    continent: "North America",
                    alpha_3: "JAM",
                    regex: null,
                    active: true
                },
                {
                    name: "Japan",
                    code: "JP",
                    id: 112,
                    mobileCode: 81,
                    continent: "Asia",
                    alpha_3: "JPN",
                    regex: null,
                    active: true
                },
                {
                    name: "Jersey",
                    code: "JE",
                    id: 113,
                    mobileCode: 44,
                    continent: "Europe",
                    alpha_3: "JEY",
                    regex: null,
                    active: true
                },
                {
                    name: "Jordan",
                    code: "JO",
                    id: 114,
                    mobileCode: 962,
                    continent: "Asia",
                    alpha_3: "JOR",
                    regex: null,
                    active: true
                },
                {
                    name: "Kazakhstan",
                    code: "KZ",
                    id: 115,
                    mobileCode: 7,
                    continent: "Asia",
                    alpha_3: "KAZ",
                    regex: null,
                    active: true
                },
                {
                    name: "Kenya",
                    code: "KE",
                    id: 116,
                    mobileCode: 254,
                    continent: "Africa",
                    alpha_3: "KEN",
                    regex: null,
                    active: true
                },
                {
                    name: "Kiribati",
                    code: "KI",
                    id: 117,
                    mobileCode: 686,
                    continent: "Oceania",
                    alpha_3: "KIR",
                    regex: null,
                    active: true
                },
                {
                    name: "Korea, Democratic People's Republic of",
                    code: "KP",
                    id: 118,
                    mobileCode: 850,
                    continent: "Asia",
                    alpha_3: "PRK",
                    regex: null,
                    active: true
                },
                {
                    name: "Korea, Republic of",
                    code: "KR",
                    id: 119,
                    mobileCode: 82,
                    continent: "Asia",
                    alpha_3: "KOR",
                    regex: null,
                    active: true
                },
                {
                    name: "Kosovo",
                    code: "XK",
                    id: 120,
                    mobileCode: 381,
                    continent: "Europe",
                    alpha_3: "XKX",
                    regex: null,
                    active: true
                },
                {
                    name: "Kuwait",
                    code: "KW",
                    id: 121,
                    mobileCode: 965,
                    continent: "Asia",
                    alpha_3: "KWT",
                    regex: null,
                    active: true
                },
                {
                    name: "Kyrgyzstan",
                    code: "KG",
                    id: 122,
                    mobileCode: 996,
                    continent: "Asia",
                    alpha_3: "KGZ",
                    regex: null,
                    active: true
                },
                {
                    name: "Lao People's Democratic Republic",
                    code: "LA",
                    id: 123,
                    mobileCode: 856,
                    continent: "Asia",
                    alpha_3: "LAO",
                    regex: null,
                    active: true
                },
                {
                    name: "Latvia",
                    code: "LV",
                    id: 124,
                    mobileCode: 371,
                    continent: "Europe",
                    alpha_3: "LVA",
                    regex: null,
                    active: true
                },
                {
                    name: "Lebanon",
                    code: "LB",
                    id: 125,
                    mobileCode: 961,
                    continent: "Asia",
                    alpha_3: "LBN",
                    regex: null,
                    active: true
                },
                {
                    name: "Lesotho",
                    code: "LS",
                    id: 126,
                    mobileCode: 266,
                    continent: "Africa",
                    alpha_3: "LSO",
                    regex: null,
                    active: true
                },
                {
                    name: "Liberia",
                    code: "LR",
                    id: 127,
                    mobileCode: 231,
                    continent: "Africa",
                    alpha_3: "LBR",
                    regex: null,
                    active: true
                },
                {
                    name: "Libyan Arab Jamahiriya",
                    code: "LY",
                    id: 128,
                    mobileCode: 218,
                    continent: "Africa",
                    alpha_3: "LBY",
                    regex: null,
                    active: true
                },
                {
                    name: "Liechtenstein",
                    code: "LI",
                    id: 129,
                    mobileCode: 423,
                    continent: "Europe",
                    alpha_3: "LIE",
                    regex: null,
                    active: true
                },
                {
                    name: "Lithuania",
                    code: "LT",
                    id: 130,
                    mobileCode: 370,
                    continent: "Europe",
                    alpha_3: "LTU",
                    regex: null,
                    active: true
                },
                {
                    name: "Luxembourg",
                    code: "LU",
                    id: 131,
                    mobileCode: 352,
                    continent: "Europe",
                    alpha_3: "LUX",
                    regex: null,
                    active: true
                },
                {
                    name: "Macao",
                    code: "MO",
                    id: 132,
                    mobileCode: 853,
                    continent: "Asia",
                    alpha_3: "MAC",
                    regex: null,
                    active: true
                },
                {
                    name: "Macedonia, the Former Yugoslav Republic of",
                    code: "MK",
                    id: 133,
                    mobileCode: 389,
                    continent: "Europe",
                    alpha_3: "MKD",
                    regex: null,
                    active: true
                },
                {
                    name: "Madagascar",
                    code: "MG",
                    id: 134,
                    mobileCode: 261,
                    continent: "Africa",
                    alpha_3: "MDG",
                    regex: null,
                    active: true
                },
                {
                    name: "Malawi",
                    code: "MW",
                    id: 135,
                    mobileCode: 265,
                    continent: "Africa",
                    alpha_3: "MWI",
                    regex: null,
                    active: true
                },
                {
                    name: "Malaysia",
                    code: "MY",
                    id: 136,
                    mobileCode: 60,
                    continent: "Asia",
                    alpha_3: "MYS",
                    regex: null,
                    active: true
                },
                {
                    name: "Maldives",
                    code: "MV",
                    id: 137,
                    mobileCode: 960,
                    continent: "Asia",
                    alpha_3: "MDV",
                    regex: null,
                    active: true
                },
                {
                    name: "Mali",
                    code: "ML",
                    id: 138,
                    mobileCode: 223,
                    continent: "Africa",
                    alpha_3: "MLI",
                    regex: null,
                    active: true
                },
                {
                    name: "Malta",
                    code: "MT",
                    id: 139,
                    mobileCode: 356,
                    continent: "Europe",
                    alpha_3: "MLT",
                    regex: null,
                    active: true
                },
                {
                    name: "Marshall Islands",
                    code: "MH",
                    id: 140,
                    mobileCode: 692,
                    continent: "Oceania",
                    alpha_3: "MHL",
                    regex: null,
                    active: true
                },
                {
                    name: "Martinique",
                    code: "MQ",
                    id: 141,
                    mobileCode: 596,
                    continent: "North America",
                    alpha_3: "MTQ",
                    regex: null,
                    active: true
                },
                {
                    name: "Mauritania",
                    code: "MR",
                    id: 142,
                    mobileCode: 222,
                    continent: "Africa",
                    alpha_3: "MRT",
                    regex: null,
                    active: true
                },
                {
                    name: "Mauritius",
                    code: "MU",
                    id: 143,
                    mobileCode: 230,
                    continent: "Africa",
                    alpha_3: "MUS",
                    regex: null,
                    active: true
                },
                {
                    name: "Mayotte",
                    code: "YT",
                    id: 144,
                    mobileCode: 269,
                    continent: "Africa",
                    alpha_3: "MYT",
                    regex: null,
                    active: true
                },
                {
                    name: "Mexico",
                    code: "MX",
                    id: 145,
                    mobileCode: 52,
                    continent: "North America",
                    alpha_3: "MEX",
                    regex: null,
                    active: true
                },
                {
                    name: "Micronesia, Federated States of",
                    code: "FM",
                    id: 146,
                    mobileCode: 691,
                    continent: "Oceania",
                    alpha_3: "FSM",
                    regex: null,
                    active: true
                },
                {
                    name: "Moldova, Republic of",
                    code: "MD",
                    id: 147,
                    mobileCode: 373,
                    continent: "Europe",
                    alpha_3: "MDA",
                    regex: null,
                    active: true
                },
                {
                    name: "Monaco",
                    code: "MC",
                    id: 148,
                    mobileCode: 377,
                    continent: "Europe",
                    alpha_3: "MCO",
                    regex: null,
                    active: true
                },
                {
                    name: "Mongolia",
                    code: "MN",
                    id: 149,
                    mobileCode: 976,
                    continent: "Asia",
                    alpha_3: "MNG",
                    regex: null,
                    active: true
                },
                {
                    name: "Montenegro",
                    code: "ME",
                    id: 150,
                    mobileCode: 382,
                    continent: "Europe",
                    alpha_3: "MNE",
                    regex: null,
                    active: true
                },
                {
                    name: "Montserrat",
                    code: "MS",
                    id: 151,
                    mobileCode: 1664,
                    continent: "North America",
                    alpha_3: "MSR",
                    regex: null,
                    active: true
                },
                {
                    name: "Morocco",
                    code: "MA",
                    id: 152,
                    mobileCode: 212,
                    continent: "Africa",
                    alpha_3: "MAR",
                    regex: null,
                    active: true
                },
                {
                    name: "Mozambique",
                    code: "MZ",
                    id: 153,
                    mobileCode: 258,
                    continent: "Africa",
                    alpha_3: "MOZ",
                    regex: null,
                    active: true
                },
                {
                    name: "Myanmar",
                    code: "MM",
                    id: 154,
                    mobileCode: 95,
                    continent: "Asia",
                    alpha_3: "MMR",
                    regex: null,
                    active: true
                },
                {
                    name: "Namibia",
                    code: "NA",
                    id: 155,
                    mobileCode: 264,
                    continent: "Africa",
                    alpha_3: "NAM",
                    regex: null,
                    active: true
                },
                {
                    name: "Nauru",
                    code: "NR",
                    id: 156,
                    mobileCode: 674,
                    continent: "Oceania",
                    alpha_3: "NRU",
                    regex: null,
                    active: true
                },
                {
                    name: "Nepal",
                    code: "NP",
                    id: 157,
                    mobileCode: 977,
                    continent: "Asia",
                    alpha_3: "NPL",
                    regex: null,
                    active: true
                },
                {
                    name: "Netherlands",
                    code: "NL",
                    id: 158,
                    mobileCode: 31,
                    continent: "Europe",
                    alpha_3: "NLD",
                    regex: null,
                    active: true
                },
                {
                    name: "New Caledonia",
                    code: "NC",
                    id: 160,
                    mobileCode: 687,
                    continent: "Oceania",
                    alpha_3: "NCL",
                    regex: null,
                    active: true
                },
                {
                    name: "New Zealand",
                    code: "NZ",
                    id: 161,
                    mobileCode: 64,
                    continent: "Oceania",
                    alpha_3: "NZL",
                    regex: null,
                    active: true
                },
                {
                    name: "Nicaragua",
                    code: "NI",
                    id: 162,
                    mobileCode: 505,
                    continent: "North America",
                    alpha_3: "NIC",
                    regex: null,
                    active: true
                },
                {
                    name: "Niger",
                    code: "NE",
                    id: 163,
                    mobileCode: 227,
                    continent: "Africa",
                    alpha_3: "NER",
                    regex: null,
                    active: true
                },
                {
                    name: "Nigeria",
                    code: "NG",
                    id: 164,
                    mobileCode: 234,
                    continent: "Africa",
                    alpha_3: "NGA",
                    regex: null,
                    active: true
                },
                {
                    name: "Niue",
                    code: "NU",
                    id: 165,
                    mobileCode: 683,
                    continent: "Oceania",
                    alpha_3: "NIU",
                    regex: null,
                    active: true
                },
                {
                    name: "Norfolk Island",
                    code: "NF",
                    id: 166,
                    mobileCode: 672,
                    continent: "Oceania",
                    alpha_3: "NFK",
                    regex: null,
                    active: true
                },
                {
                    name: "Northern Mariana Islands",
                    code: "MP",
                    id: 167,
                    mobileCode: 1670,
                    continent: "Oceania",
                    alpha_3: "MNP",
                    regex: null,
                    active: true
                },
                {
                    name: "Norway",
                    code: "NO",
                    id: 168,
                    mobileCode: 47,
                    continent: "Europe",
                    alpha_3: "NOR",
                    regex: null,
                    active: true
                },
                {
                    name: "Oman",
                    code: "OM",
                    id: 169,
                    mobileCode: 968,
                    continent: "Asia",
                    alpha_3: "OMN",
                    regex: null,
                    active: true
                },
                {
                    name: "Pakistan",
                    code: "PK",
                    id: 170,
                    mobileCode: 92,
                    continent: "Asia",
                    alpha_3: "PAK",
                    regex: null,
                    active: true
                },
                {
                    name: "Palau",
                    code: "PW",
                    id: 171,
                    mobileCode: 680,
                    continent: "Oceania",
                    alpha_3: "PLW",
                    regex: null,
                    active: true
                },
                {
                    name: "Palestinian Territory, Occupied",
                    code: "PS",
                    id: 172,
                    mobileCode: 970,
                    continent: "Asia",
                    alpha_3: "PSE",
                    regex: null,
                    active: true
                },
                {
                    name: "Panama",
                    code: "PA",
                    id: 173,
                    mobileCode: 507,
                    continent: "North America",
                    alpha_3: "PAN",
                    regex: null,
                    active: true
                },
                {
                    name: "Papua New Guinea",
                    code: "PG",
                    id: 174,
                    mobileCode: 675,
                    continent: "Oceania",
                    alpha_3: "PNG",
                    regex: null,
                    active: true
                },
                {
                    name: "Paraguay",
                    code: "PY",
                    id: 175,
                    mobileCode: 595,
                    continent: "South America",
                    alpha_3: "PRY",
                    regex: null,
                    active: true
                },
                {
                    name: "Peru",
                    code: "PE",
                    id: 176,
                    mobileCode: 51,
                    continent: "South America",
                    alpha_3: "PER",
                    regex: null,
                    active: true
                },
                {
                    name: "Philippines",
                    code: "PH",
                    id: 177,
                    mobileCode: 63,
                    continent: "Asia",
                    alpha_3: "PHL",
                    regex: null,
                    active: true
                },
                {
                    name: "Pitcairn",
                    code: "PN",
                    id: 178,
                    mobileCode: 64,
                    continent: "Oceania",
                    alpha_3: "PCN",
                    regex: null,
                    active: true
                },
                {
                    name: "Poland",
                    code: "PL",
                    id: 179,
                    mobileCode: 48,
                    continent: "Europe",
                    alpha_3: "POL",
                    regex: null,
                    active: true
                },
                {
                    name: "Portugal",
                    code: "PT",
                    id: 180,
                    mobileCode: 351,
                    continent: "Europe",
                    alpha_3: "PRT",
                    regex: null,
                    active: true
                },
                {
                    name: "Puerto Rico",
                    code: "PR",
                    id: 181,
                    mobileCode: 1787,
                    continent: "North America",
                    alpha_3: "PRI",
                    regex: null,
                    active: true
                },
                {
                    name: "Qatar",
                    code: "QA",
                    id: 182,
                    mobileCode: 974,
                    continent: "Asia",
                    alpha_3: "QAT",
                    regex: null,
                    active: true
                },
                {
                    name: "Reunion",
                    code: "RE",
                    id: 183,
                    mobileCode: 262,
                    continent: "Africa",
                    alpha_3: "REU",
                    regex: null,
                    active: true
                },
                {
                    name: "Romania",
                    code: "RO",
                    id: 184,
                    mobileCode: 40,
                    continent: "Europe",
                    alpha_3: "ROM",
                    regex: null,
                    active: true
                },
                {
                    name: "Russian Federation",
                    code: "RU",
                    id: 185,
                    mobileCode: 70,
                    continent: "Asia",
                    alpha_3: "RUS",
                    regex: null,
                    active: true
                },
                {
                    name: "Rwanda",
                    code: "RW",
                    id: 186,
                    mobileCode: 250,
                    continent: "Africa",
                    alpha_3: "RWA",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Barthelemy",
                    code: "BL",
                    id: 187,
                    mobileCode: 590,
                    continent: "North America",
                    alpha_3: "BLM",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Helena",
                    code: "SH",
                    id: 188,
                    mobileCode: 290,
                    continent: "Africa",
                    alpha_3: "SHN",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Kitts and Nevis",
                    code: "KN",
                    id: 189,
                    mobileCode: 1869,
                    continent: "North America",
                    alpha_3: "KNA",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Lucia",
                    code: "LC",
                    id: 190,
                    mobileCode: 1758,
                    continent: "North America",
                    alpha_3: "LCA",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Martin",
                    code: "MF",
                    id: 191,
                    mobileCode: 590,
                    continent: "North America",
                    alpha_3: "MAF",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Pierre and Miquelon",
                    code: "PM",
                    id: 192,
                    mobileCode: 508,
                    continent: "North America",
                    alpha_3: "SPM",
                    regex: null,
                    active: true
                },
                {
                    name: "Saint Vincent and the Grenadines",
                    code: "VC",
                    id: 193,
                    mobileCode: 1784,
                    continent: "North America",
                    alpha_3: "VCT",
                    regex: null,
                    active: true
                },
                {
                    name: "Samoa",
                    code: "WS",
                    id: 194,
                    mobileCode: 684,
                    continent: "Oceania",
                    alpha_3: "WSM",
                    regex: null,
                    active: true
                },
                {
                    name: "San Marino",
                    code: "SM",
                    id: 195,
                    mobileCode: 378,
                    continent: "Europe",
                    alpha_3: "SMR",
                    regex: null,
                    active: true
                },
                {
                    name: "Sao Tome and Principe",
                    code: "ST",
                    id: 196,
                    mobileCode: 239,
                    continent: "Africa",
                    alpha_3: "STP",
                    regex: null,
                    active: true
                },
                {
                    name: "Saudi Arabia",
                    code: "SA",
                    id: 197,
                    mobileCode: 966,
                    continent: "Asia",
                    alpha_3: "SAU",
                    regex: null,
                    active: true
                },
                {
                    name: "Senegal",
                    code: "SN",
                    id: 198,
                    mobileCode: 221,
                    continent: "Africa",
                    alpha_3: "SEN",
                    regex: null,
                    active: true
                },
                {
                    name: "Serbia",
                    code: "RS",
                    id: 199,
                    mobileCode: 381,
                    continent: "Europe",
                    alpha_3: "SRB",
                    regex: null,
                    active: true
                },
                {
                    name: "Seychelles",
                    code: "SC",
                    id: 201,
                    mobileCode: 248,
                    continent: "Africa",
                    alpha_3: "SYC",
                    regex: null,
                    active: true
                },
                {
                    name: "Sierra Leone",
                    code: "SL",
                    id: 202,
                    mobileCode: 232,
                    continent: "Africa",
                    alpha_3: "SLE",
                    regex: null,
                    active: true
                },
                {
                    name: "Singapore",
                    code: "SG",
                    id: 203,
                    mobileCode: 65,
                    continent: "Asia",
                    alpha_3: "SGP",
                    regex: null,
                    active: true
                },
                {
                    name: "Sint Maarten",
                    code: "SX",
                    id: 204,
                    mobileCode: 1,
                    continent: "North America",
                    alpha_3: "SXM",
                    regex: null,
                    active: true
                },
                {
                    name: "Slovakia",
                    code: "SK",
                    id: 205,
                    mobileCode: 421,
                    continent: "Europe",
                    alpha_3: "SVK",
                    regex: null,
                    active: true
                },
                {
                    name: "Slovenia",
                    code: "SI",
                    id: 206,
                    mobileCode: 386,
                    continent: "Europe",
                    alpha_3: "SVN",
                    regex: null,
                    active: true
                },
                {
                    name: "Solomon Islands",
                    code: "SB",
                    id: 207,
                    mobileCode: 677,
                    continent: "Oceania",
                    alpha_3: "SLB",
                    regex: null,
                    active: true
                },
                {
                    name: "Somalia",
                    code: "SO",
                    id: 208,
                    mobileCode: 252,
                    continent: "Africa",
                    alpha_3: "SOM",
                    regex: null,
                    active: true
                },
                {
                    name: "South Africa",
                    code: "ZA",
                    id: 209,
                    mobileCode: 27,
                    continent: "Africa",
                    alpha_3: "ZAF",
                    regex: null,
                    active: true
                },
                {
                    name: "South Georgia and the South Sandwich Islands",
                    code: "GS",
                    id: 210,
                    mobileCode: 500,
                    continent: "Antarctica",
                    alpha_3: "SGS",
                    regex: null,
                    active: true
                },
                {
                    name: "South Sudan",
                    code: "SS",
                    id: 211,
                    mobileCode: 211,
                    continent: "Africa",
                    alpha_3: "SSD",
                    regex: null,
                    active: true
                },
                {
                    name: "Spain",
                    code: "ES",
                    id: 212,
                    mobileCode: 34,
                    continent: "Europe",
                    alpha_3: "ESP",
                    regex: null,
                    active: true
                },
                {
                    name: "Sri Lanka",
                    code: "LK",
                    id: 213,
                    mobileCode: 94,
                    continent: "Asia",
                    alpha_3: "LKA",
                    regex: null,
                    active: true
                },
                {
                    name: "Sudan",
                    code: "SD",
                    id: 214,
                    mobileCode: 249,
                    continent: "Africa",
                    alpha_3: "SDN",
                    regex: null,
                    active: true
                },
                {
                    name: "Suriname",
                    code: "SR",
                    id: 215,
                    mobileCode: 597,
                    continent: "South America",
                    alpha_3: "SUR",
                    regex: null,
                    active: true
                },
                {
                    name: "Svalbard and Jan Mayen",
                    code: "SJ",
                    id: 216,
                    mobileCode: 47,
                    continent: "Europe",
                    alpha_3: "SJM",
                    regex: null,
                    active: true
                },
                {
                    name: "Swaziland",
                    code: "SZ",
                    id: 217,
                    mobileCode: 268,
                    continent: "Africa",
                    alpha_3: "SWZ",
                    regex: null,
                    active: true
                },
                {
                    name: "Sweden",
                    code: "SE",
                    id: 218,
                    mobileCode: 46,
                    continent: "Europe",
                    alpha_3: "SWE",
                    regex: null,
                    active: true
                },
                {
                    name: "Switzerland",
                    code: "CH",
                    id: 219,
                    mobileCode: 41,
                    continent: "Europe",
                    alpha_3: "CHE",
                    regex: null,
                    active: true
                },
                {
                    name: "Syrian Arab Republic",
                    code: "SY",
                    id: 220,
                    mobileCode: 963,
                    continent: "Asia",
                    alpha_3: "SYR",
                    regex: null,
                    active: true
                },
                {
                    name: "Taiwan, Province of China",
                    code: "TW",
                    id: 221,
                    mobileCode: 886,
                    continent: "Asia",
                    alpha_3: "TWN",
                    regex: null,
                    active: true
                },
                {
                    name: "Tajikistan",
                    code: "TJ",
                    id: 222,
                    mobileCode: 992,
                    continent: "Asia",
                    alpha_3: "TJK",
                    regex: null,
                    active: true
                },
                {
                    name: "Tanzania, United Republic of",
                    code: "TZ",
                    id: 223,
                    mobileCode: 255,
                    continent: "Africa",
                    alpha_3: "TZA",
                    regex: null,
                    active: true
                },
                {
                    name: "Thailand",
                    code: "TH",
                    id: 224,
                    mobileCode: 66,
                    continent: "Asia",
                    alpha_3: "THA",
                    regex: null,
                    active: true
                },
                {
                    name: "Timor-Leste",
                    code: "TL",
                    id: 225,
                    mobileCode: 670,
                    continent: "Asia",
                    alpha_3: "TLS",
                    regex: null,
                    active: true
                },
                {
                    name: "Togo",
                    code: "TG",
                    id: 226,
                    mobileCode: 228,
                    continent: "Africa",
                    alpha_3: "TGO",
                    regex: null,
                    active: true
                },
                {
                    name: "Tokelau",
                    code: "TK",
                    id: 227,
                    mobileCode: 690,
                    continent: "Oceania",
                    alpha_3: "TKL",
                    regex: null,
                    active: true
                },
                {
                    name: "Tonga",
                    code: "TO",
                    id: 228,
                    mobileCode: 676,
                    continent: "Oceania",
                    alpha_3: "TON",
                    regex: null,
                    active: true
                },
                {
                    name: "Trinidad and Tobago",
                    code: "TT",
                    id: 229,
                    mobileCode: 1868,
                    continent: "North America",
                    alpha_3: "TTO",
                    regex: null,
                    active: true
                },
                {
                    name: "Tunisia",
                    code: "TN",
                    id: 230,
                    mobileCode: 216,
                    continent: "Africa",
                    alpha_3: "TUN",
                    regex: null,
                    active: true
                },
                {
                    name: "Turkey",
                    code: "TR",
                    id: 231,
                    mobileCode: 90,
                    continent: "Asia",
                    alpha_3: "TUR",
                    regex: null,
                    active: true
                },
                {
                    name: "Turkmenistan",
                    code: "TM",
                    id: 232,
                    mobileCode: 7370,
                    continent: "Asia",
                    alpha_3: "TKM",
                    regex: null,
                    active: true
                },
                {
                    name: "Turks and Caicos Islands",
                    code: "TC",
                    id: 233,
                    mobileCode: 1649,
                    continent: "North America",
                    alpha_3: "TCA",
                    regex: null,
                    active: true
                },
                {
                    name: "Tuvalu",
                    code: "TV",
                    id: 234,
                    mobileCode: 688,
                    continent: "Oceania",
                    alpha_3: "TUV",
                    regex: null,
                    active: true
                },
                {
                    name: "Uganda",
                    code: "UG",
                    id: 235,
                    mobileCode: 256,
                    continent: "Africa",
                    alpha_3: "UGA",
                    regex: null,
                    active: true
                },
                {
                    name: "Ukraine",
                    code: "UA",
                    id: 236,
                    mobileCode: 380,
                    continent: "Europe",
                    alpha_3: "UKR",
                    regex: null,
                    active: true
                },
                {
                    name: "United Arab Emirates",
                    code: "AE",
                    id: 237,
                    mobileCode: 971,
                    continent: "Asia",
                    alpha_3: "ARE",
                    regex: null,
                    active: true
                },
                {
                    name: "United Kingdom",
                    code: "GB",
                    id: 238,
                    mobileCode: 44,
                    continent: "Europe",
                    alpha_3: "GBR",
                    regex: null,
                    active: true
                },
                {
                    name: "United States",
                    code: "US",
                    id: 239,
                    mobileCode: 1,
                    continent: "North America",
                    alpha_3: "USA",
                    regex: null,
                    active: true
                },
                {
                    name: "United States Minor Outlying Islands",
                    code: "UM",
                    id: 240,
                    mobileCode: 1,
                    continent: "North America",
                    alpha_3: "UMI",
                    regex: null,
                    active: true
                },
                {
                    name: "Uruguay",
                    code: "UY",
                    id: 241,
                    mobileCode: 598,
                    continent: "South America",
                    alpha_3: "URY",
                    regex: null,
                    active: true
                },
                {
                    name: "Uzbekistan",
                    code: "UZ",
                    id: 242,
                    mobileCode: 998,
                    continent: "Asia",
                    alpha_3: "UZB",
                    regex: null,
                    active: true
                },
                {
                    name: "Vanuatu",
                    code: "VU",
                    id: 243,
                    mobileCode: 678,
                    continent: "Oceania",
                    alpha_3: "VUT",
                    regex: null,
                    active: true
                },
                {
                    name: "Venezuela",
                    code: "VE",
                    id: 244,
                    mobileCode: 58,
                    continent: "South America",
                    alpha_3: "VEN",
                    regex: null,
                    active: true
                },
                {
                    name: "Viet Nam",
                    code: "VN",
                    id: 245,
                    mobileCode: 84,
                    continent: "Asia",
                    alpha_3: "VNM",
                    regex: null,
                    active: true
                },
                {
                    name: "Virgin Islands, British",
                    code: "VG",
                    id: 246,
                    mobileCode: 1284,
                    continent: "North America",
                    alpha_3: "VGB",
                    regex: null,
                    active: true
                },
                {
                    name: "Virgin Islands, U.s.",
                    code: "VI",
                    id: 247,
                    mobileCode: 1340,
                    continent: "North America",
                    alpha_3: "VIR",
                    regex: null,
                    active: true
                },
                {
                    name: "Wallis and Futuna",
                    code: "WF",
                    id: 248,
                    mobileCode: 681,
                    continent: "Oceania",
                    alpha_3: "WLF",
                    regex: null,
                    active: true
                },
                {
                    name: "Western Sahara",
                    code: "EH",
                    id: 249,
                    mobileCode: 212,
                    continent: "Africa",
                    alpha_3: "ESH",
                    regex: null,
                    active: true
                },
                {
                    name: "Yemen",
                    code: "YE",
                    id: 250,
                    mobileCode: 967,
                    continent: "Asia",
                    alpha_3: "YEM",
                    regex: null,
                    active: true
                },
                {
                    name: "Zambia",
                    code: "ZM",
                    id: 251,
                    mobileCode: 260,
                    continent: "Africa",
                    alpha_3: "ZMB",
                    regex: null,
                    active: true
                },
                {
                    name: "Zimbabwe",
                    code: "ZW",
                    id: 252,
                    mobileCode: 263,
                    continent: "Africa",
                    alpha_3: "ZWE",
                    regex: null,
                    active: true
                },
            ]
        },
        validateInput(inputKey) {
            let textInput = this.form[inputKey]
            this.formInputList[inputKey].hasError =
                !(textInput !== '' && this.formInputList[inputKey].regex.test(textInput))

            this.formInputList = {...this.formInputList}
        },
        maxtelInput(){
            if (this.value.length > this.maxLength)
                this.value = this.value.slice(0, this.maxLength);
        },
        defaultFormInput() {
            //validate list
            let inputs = {
                'weight': {
                    regex: /^(2[0-9]|[3-9][0-9]|1[0-9]{2}|200)$/,
                    messageError: 'وزن باید بین 1 تا 2 باشه'
                },
                'height': {
                    regex: /^(10[0-9]|1[1-9][0-9]|2[0-2][0-9]|230)$/,
                    messageError: 'قد باید بین 3 تا 4 باشه'

                },
                'age': {
                    regex: /^(1[2-9]|[2-6][0-9]|70)$/,
                    messageError: 'سن باید بین 5 تا 6 باشه'
                },
                'wrist': {
                    regex: /^([5-9]|[12][0-9]|30)$/,
                    messageError: 'دور مچ باید بین 7 تا 8 باشه'
                },
                'name':{
                    regex: /^((.*[\u0600-\u06FF\s]|[a-zA-Z]){3})+$/,
                    messageError: 'لطفا نام خودرا به درستی وارد کنید'
                },
                'family':{
                    regex: /^((.*[\u0600-\u06FF\s]|[a-zA-Z]){3})+$/,
                    messageError: 'لطفا نام خانوادگی خودرا به درستی وارد کنید'
                }
            }
            this.formInputList = {}

            // set null error text
            Object.entries(inputs).map(([key, value]) => {
                this.formInputList[key] = {
                    key: key,
                    hasError: false,
                    ...value
                }
            })

        },
        offerCodeSub: async  function (code){
            console.log("ok")
            var vm = this;
            vm.loading = true;
            let result = "";
            code = this.form.offerCode;
            var message = $('.offer-box-info ul');
            if (code) {
                code = code.toLowerCase();
                code = code.replace(/\s/g, '');
                this.offerCodeCheck(code);
                // if (result.success){
                //     $("#holder1").addClass("hidden");
                //     $("#holder2").addClass("hidden");
                //     this.form.offerCodeValid = true;
                //     this.offerCodeProduct(result);
                //     $('#offer-box').slideToggle()
                //     $('.offer-box > p:first-child').slideToggle()
                //     message.append(`<li>${result.message}</li>`)
                //     $('.offer-box-info').slideToggle()
                // }else{
                //     this.form.offerCodeValid = false;
                //     this.loading = false;
                //     $("#holder1").addClass("hidden");
                //     $("#holder2").addClass("hidden");
                // }

            }else {
                $('#offer-input').focus()
                this.loading = false;
            }
        },
        offerCodeCheck: function (code){
            let vm = this;
            let result = "";
            let package_id = vm.selectPackageId()
            let message = $('.offer-box-info ul');
            $.ajax({
                type: 'post',
                url: 'https://landing.bornafit.ir/api/fasttrack/percent.php',
                data: {
                    phone: vm.form.phone,
                    coupon: code,
                    package_id: package_id
                },
                dataType: 'json',
                success: function (data) {
                    if(data.success){
                        vm.form.offerCodeValid = true;
                        let final_price = data.final_price;
                        let product_id = vm.selectedPackageItem.product_id;
                        let index = vm.packages.products.findIndex(x => x.product_id == product_id);
                        vm.returnSumPrice.selectedPackageItemSumOffer = ((parseFloat(vm.returnSumPrice.selectedPackageItemSumOffer.replace(/,/g, ''))) + data.discount).toLocaleString();
                        vm.returnSumPrice.selectedPackageItemSum = (final_price).toLocaleString();
                        $('#offer-box').slideToggle()
                        $('.offer-box > p:first-child').slideToggle()
                        message.append(`<li>${data.message}</li>`)
                        console.log(data.message)
                        $('.offer-box-info').slideToggle()
                        vm.loading = false;
                    }else {
                        vm.form.offerCodeValid = false;
                        vm.loading = false;
                    }
                },
                error: function (er) {
                    vm.form.offerCodeValid = false;
                    vm.loading = false;
                    vm.loading = false;
                }
            })

        },
        offerCodeProduct(data){
            let vm = this;
            let final_price = data.final_price;
            // let product_id = data.package_id;
            let product_id = this.selectedPackageItem.product_id;
            let index = this.packages.findIndex(x => x.product_id == product_id);
            vm.returnSumPrice.selectedPackageItemSumOffer = ((parseFloat(vm.returnSumPrice.selectedPackageItemSumOffer.replace(/,/g, ''))) + data.discount).toLocaleString();
            vm.returnSumPrice.selectedPackageItemSum = (final_price).toLocaleString();
            // this.packages[index].offerPrice = final_price;
            // this.packages[index].amount = final_price;
            // this.packages[index].offer_count = Math.round(((this.selectedPackageItem.price - final_price)/this.selectedPackageItem.price)*100);
        },
        setCookie(name, value, minutes){
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            $.cookie(name, value, { expires: date });
        },
        postBack: function (company, position){
            function getMediaadIid() {
                var urlParams = new URLSearchParams(window.location.search);
                var iid = urlParams.get('utm_ma');

                if (iid) {
                    if (localStorage) {
                        localStorage.setItem("mediaadIid", iid);
                    }

                    return iid;
                }

                if (localStorage && localStorage.getItem("mediaadIid")) {
                    return localStorage.getItem("mediaadIid");
                }
            }

            var xhr = new XMLHttpRequest();
            if(company === "mediaad")
            {
                console.log("mediaad fier")
                var actionName = "register";
                var iid = getMediaadIid();
                if (iid) {
                    xhr.withCredentials = !0;
                    xhr.open("GET", "https://api.mediaad.org/v1/events/post-back?actionName=" + actionName + "&clickId=" + iid);
                    xhr.timeout = 30000;
                    xhr.send();
                }
            }
            if(company === "chavosh"){
                vm = this;
                $.ajax({
                    type: 'post',
                    url: 'https://trk.chavosh.org/api/v1/event/submit/lead/',
                    data: {
                        ip: vm.userInfo.ip,
                        user_agent: navigator.userAgent,
                        analytics_campaign: $.cookie('analytics_campaign'),
                        _yngt: $.cookie('_yngt'),
                        analytics_session_token: $.cookie('analytics_session_token'),
                        phone_number: this.form.phone
                    },
                    headers: {
                        Authorization: "Token 7487ab7cf28ccde065f4d8bed68188a252040480"
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log("chavoosh fier")
                    },
                    error: function (er) {

                    }
                })
            }
            if(company === "affili"){
                console.log("affili")
                var vm = this;
                affili('lead',{
                    meta_data: {
                        form_id : position,
                        first_name: vm.form.name,
                        last_name: vm.form.family,
                        mobile: vm.form.phone,
                        email: ""
                    }
                })
            }
            if(company === "yektanet") {
                var data = urlParams.get("utm_yn_data")
                var url = "https://tracker.yektanet.com/api/v1/callbacks/base/AjfOtYyqHbHGWOKykamekAnUrwwZFZUC?label="+data;
                //xhr.withCredentials = !0;
                xhr.open("GET", url);
                xhr.timeout = 30000;
                xhr.send();
            }


        },
        register: async function (i, position) {
            if (this.loading) return;
            if (this.invalidName || this.invalidFamily) return;
            if (this.validationPhone || this.form.phone === '') return this.$refs['tel-' + i].focus();
            if (this.invalidPass) return this.$refs['pass'].focus();
            //if (this.submitStatus === 'success') return;
            var vm = this;
            var form = this.form;
            // $.getJSON("https://landing.bornafit.ir/api/getnumber/getIP.php", function(data) {
            //     vm.userInfo.ip = data.ip;
            // })
            let data = await $.getJSON("https://landing.bornafit.ir/api/getnumber/getIP.php");
            vm.userInfo.ip = data.ip;
            console.log(vm.userInfo.ip)
            vm.userInfo.phone = form.phone;
            vm.userInfo.country_code = vm.selectedcountryListItem.mobileCode;
            vm.userInfo.position = position;
            vm.userInfo.name = vm.form.name;
            vm.userInfo.family = vm.form.family;
            vm.userInfo.gender = this.form.gender === "female" ? 0 : 1;
            vm.userInfo.age = this.form.age;
            vm.userInfo.overWeight = vm.result.weight;
            vm.userInfo.repository = 1;
            //vm.userInfo.topic = vm.form.adviceType === "whatsapp" ? 39 : 16;
            vm.userInfo.topic = 52;
            vm.userInfo.bmi = this.result.dietType === "اضافه وزن" ? "+"+this.result.weight : "-"+this.result.weight;



            if (this.submitStatus !== 'success') {
                vm.response.msg = '';
                vm.loading = true;
                sentFormMySql();


                function sentFormMySql() {
                    $.ajax({
                        type: 'post',
                        url: 'https://landing.bornafit.ir/api/fasttrack/getUserInfo.php',
                        data: vm.userInfo,
                        dataType: 'json',
                        success: function (data) {
                            vm.loading = false;
                            vm.response.msg = 'شماره شما با موفقیت ثبت شد!';
                            if(data.has_number.existed){
                                if(!data.has_number.status_pay){
                                    vm.step = 3;
                                    vm.childStep = 1;
                                    vm.getUserToken(vm.form.phone);
                                    vm.sendAutomationStep(2);
                                }
                                else{
                                    vm.step = 4;
                                    vm.childStep = 1;
                                }

                            }
                            else{
                                vm.childStep = 2
                                vm.startTimerVerify()
                                vm.sendAutomationStep(1, 40);
                            }

                            //this.offerCodeSub("50mehr");
                            sentFormAnalytics(data)
                            if (!$.cookie('postBack_bornafit')) {
                                console.log("no cookie")
                                if (vm.userInfo.utm_source === 'chavosh')
                                    vm.postBack("chavosh");
                                if (vm.userInfo.utm_source === 'mediaad' || vm.userInfo.utm_source === 'tapsell')
                                    vm.postBack("mediaad");
                                if (vm.userInfo.utm_source === 'yektanet')
                                    vm.postBack("yektanet");
                                vm.setCookie("postBack_bornafit",true, 60);
                            }
                            vm.postBack("affili", position);
                        },
                        error: function (er) {

                        }
                    })

                }
                function sentFormAnalytics(data){
                    dataLayer.push({
                        "event": "tagManagerGetLead",
                        "attributes": {
                            "phone": form.phone,
                            "statusphone": true,
                            "duplicate": data["has_number"],
                            "adviceType": form.adviceType
                        }
                    });
                }
            } else
            {
                $.ajax({
                    type: 'get',
                    url: 'https://landing.bornafit.ir/api/getnumber/',
                    data: vm.userInfo,
                    dataType: 'json',
                    success: function (data) {
                    },
                    error: function (er) {

                    }
                })
                vm.step = 3;
                vm.childStep = 1;
            }
            if (vm.userInfo.utm_source === 'namasha')
                this.postBack("namasha");

            // $("#card-payment").click(function() {
            //     $('.card-payment-detail-container').slideDown();
            // });
            // $("#online-payment").click(function() {
            //     $('.card-payment-detail-container').slideUp();
            // });
        },
        verify: function (){
            let vm = this;
            let verify = vm.form.verify;
            if(vm.form.verify.length < 4){
                vm.form.isVerify = true;
                return;
            }
            vm.loading = true;
            $.ajax({
                type: "post",
                url: "https://landing.bornafit.ir/api/fasttrack/verify.php",
                data: {
                    phone: vm.form.phone,
                    country_code: vm.selectedcountryListItem.mobileCode,
                    code: verify
                },
                success: function (data) {
                    vm.loading = false;
                    if(data.success){
                        vm.step = 3;
                        vm.childStep = 1;
                        vm.form.isVerify = true;
                        vm.submitStatus = 'success';
                        vm.sendDataBeforePayment();
                        vm.getUserToken(vm.form.phone);
                        vm.sendAutomationStep(2);
                    }else {
                        vm.form.isVerify = false;
                    }
                },
                error: function (er) {
                    vm.loading = false;
                    vm.form.isVerify = true;
                    console.log(er);
                }
            })
        },
        verifyWCode: function (){
            let vm = this;
            if(!vm.form.registerCode) return;
            vm.loading = true;
            $.ajax({
                type: "post",
                url: "https://landing.bornafit.ir/api/fasttrack/verify.php",
                data: {
                    phone: vm.form.phone,
                    country_code: vm.selectedcountryListItem.mobileCode,
                },
                success: function (data) {
                    vm.loading = false;
                    if(data.success){
                        vm.step = 3
                        vm.childStep = 1;
                        vm.form.isVerify = true;
                        vm.submitStatus = 'success';
                        vm.sendDataBeforePayment();
                        vm.getUserToken(vm.form.phone);
                        vm.sendAutomationStep(2);
                    }else {
                        vm.form.isVerify = false;
                    }
                },
                error: function (er) {
                    vm.loading = false;
                    vm.form.isVerify = true;
                    console.log(er);
                }
            })
        },
        sendDataBeforePayment: function (){
            let vm = this;
            let form = vm.form;
            let product_id = 48;
            let user = {
                phone: form.phone,
                package_id: product_id,
                //coupon: code,
                first_name: vm.form.name,
                last_name: vm.form.family,
                age: vm.form.age,
                gender: vm.form.gender === "female" ? 0 : 1,
                weight: vm.form.weight,
                height: vm.form.height,
                wrist: vm.form.gender === "female" ? 17 : 18,
                birth_date: vm.form.birthday
            }
            $.ajax({
                type: "post",
                url: "https://landing.bornafit.ir/api/fasttrack/paymentFastTrack.php",
                data: user,
                success: function (data) {
                },
                error: function (er) {
                }
            })
        },
        calculate: function () {

            var form = this.form;

            var weight = form.weight,
                height = form.height,
                //wrist = form.wrist,
                wrist = Math.round(height / 10),
                age = form.age,
                gender = form.gender;

            var height_m = height / 100,
                skl = height / wrist,
                //skl = 'normal',
                normal_weight,
                fitness_weight,
                health_weight,
                bmiPro,
                bmi;

            if (skl > 10.5) {
                skl = 'slim';
            } else if (skl < 9.5) {
                skl = 'fat';
            } else {
                skl = 'normal';
            }

            if (gender === 'male') {
                if (age >= 16 && age < 31) {
                    normal_weight = height_m * height_m * 23.3;
                } else if (age >= 31 && age < 45) {
                    normal_weight = height_m * height_m * 24.8;
                } else if (age >= 45) {
                    normal_weight = height_m * height_m * 25.4;
                }
            } else {
                if (age >= 16 && age < 31) {
                    normal_weight = height_m * height_m * 20.8;
                } else if (age >= 31 && age < 40) {
                    normal_weight = height_m * height_m * 22.5;
                } else if (age >= 40 && age < 45) {
                    normal_weight = height_m * height_m * 24.1;
                } else if (age >= 45) {
                    normal_weight = height_m * height_m * 25;
                }
            }

            // For Teenager
            if ((10 <= age) && (age <= 11) && (height_m < 1.65)) {
                normal_weight = (height_m * height_m) * (age + 8);
            } else if ((12 <= age) && (age <= 15) && (height_m <= 1.65)) {
                normal_weight = (height_m * height_m) * (age + 5);
            } else if ((10 <= age) && (age <= 15) && (height_m >= 1.65)) {
                if (gender === 'male') {
                    normal_weight = (height_m * height_m) * 23.3;
                } else {
                    normal_weight = (height_m * height_m) * 20.8;
                }
            }

            if (skl === 'slim') {
                normal_weight *= 0.94;
            } else if (skl === 'fat') {
                normal_weight *= 1.06;
            }

            normal_weight = Math.round(normal_weight);
            fitness_weight = Math.round(normal_weight * 90 / 100);
            health_weight = Math.round(normal_weight * 112 / 100);

            bmi = Math.round(weight / (height_m * height_m));
            bmiPro = Math.round(normal_weight / (height_m * height_m));

            var add_weight = weight - normal_weight,
                less_weight = normal_weight - weight;

            var months = 0;

            if (add_weight > 0) {
                var upHundred = this.upHundred(weight, normal_weight);
                var between = this.between(weight, normal_weight);
                var underSeventy = this.underSeventy(weight, normal_weight);
                var timeUpHundred = upHundred / 4;
                var timeBetween = between / 3.5;
                var timeUnderSeventy = underSeventy / 3;
                months = Math.round(timeUpHundred + timeBetween + timeUnderSeventy);
            } else if (less_weight > 0) {
                months = (Math.round(less_weight / 0.8));
            } else {
                months = '-';
            }

            var bmi_status = 0;
            if (bmi < 20) {
                bmi_status = 0;
                bmi_status = 0;
                this.result.chart.title = "کمبود وزن";
                this.result.chart.holder = "./assets/images/bmi/holder/1underweight_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/1underweight_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/1underweight_women.svg";
                }
            }
            if (bmi >= 20 && bmi < 25) {
                bmi_status = 1;
                bmi_status = 45;
                this.result.chart.title = "وزن سلامت";
                this.result.chart.holder = "./assets/images/bmi/holder/2healthyweight_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/2healthyweight_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/2healthyweight_women.svg";
                }
            }
            if (bmi >= 25 && bmi < 30) {
                bmi_status = 2;
                bmi_status = 88;
                this.result.chart.title = "اضافه وزن";
                this.result.chart.holder = "./assets/images/bmi/holder/3overweight_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/3overweight_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/3overweight_women.svg";
                }
            }
            if (bmi >= 30 && bmi < 35) {
                bmi_status = 3;
                bmi_status = 130;
                this.result.chart.title = "چاقی";
                this.result.chart.holder = "./assets/images/bmi/holder/4obesity_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/4obesity_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/4obesity_women.svg";
                }
            }
            if (bmi >= 35 && bmi < 40) {
                bmi_status = 4;
                bmi_status = 170;
                this.result.chart.title = "چاقی مفرط";
                this.result.chart.holder = "./assets/images/bmi/holder/5excessiveobesity_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/5excessiveobesity_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/5excessiveobesity_women.svg";
                }
            }
            if (bmi >= 40) {
                bmi_status = 5;
                bmi_status = 170;
                this.result.chart.title = "چاقی مفرط";
                this.result.chart.holder = "./assets/images/bmi/holder/5excessiveobesity_holder.svg";
                if(gender === "male"){
                    this.result.chart.img = "./assets/images/bmi/men/5excessiveobesity_men.svg";
                }else {
                    this.result.chart.img = "./assets/images/bmi/women/5excessiveobesity_women.svg";
                }
            }

            this.result.bmi = bmi;
            this.result.bmiPro = bmiPro;
            this.result.months = months;
            this.result.fitnessWeight = fitness_weight;
            this.result.normalWeight = normal_weight;
            this.result.healthWeight = health_weight;
            this.result.dietType = add_weight >= 0 ? 'اضافه وزن' : 'کمبود وزن';
            this.result.weight = add_weight >= 0 ? add_weight : less_weight;
            this.result.bmiStatus = bmi_status;
            this.result.overWeight = add_weight >= 0 ? Math.round(this.result.weight * 0.6) : 0;
            this.result.normalAbdomen = form.gender === 'male' ? (form.height / 2) + 10 : (form.height / 2) + 5;
            this.childStep = 2;
            this.getBirthday(form.age);
            this.validateDietPackage()
            //this.submitStatus === 'success' ? this.step = 2 : this.step = 2;




        },
        toggle() {
            this.$nextTick(() => {
                if (this.step == 2) {
                    console.log($("#MeterHand"))
                }
            });
        },
        errorHandle: function (step){
            let vm = this;
            if(step === 1){
                if(!vm.form.packageSelectId){
                    $('p.error').show()
                }else {
                    vm.childStep = 2;
                    vm.sendAutomationStep(3);
                }
            }
            else if(step === 2){
                if(vm.packageType === "afzayesh"){
                    vm.childStep = 4;
                }else
                    vm.childStep = 3;
                vm.sendAutomationStep(4);
            }else{
                vm.childStep++;
            }

        },
        userPayment: function (){
            let vm = this;
            let form = this.form;
            let amount = Number(this.returnSumPrice.selectedPackageItemSum.replace(/[^0-9.-]+/g,""));
            let product_id = vm.selectPackageId()
            let code = vm.form.offerCode;
            if(vm.form.offer_code_url){
                if(vm.form.offer_code_list.indexOf(vm.form.offer_code_url) != -1){
                    code = vm.form.offer_code_url;
                }
            }

            //this.form.payment_method = 'online-payment';
            let user = {
                phone: form.phone,
                package_id: product_id,
                coupon: code,
                first_name: vm.form.name,
                last_name: vm.form.family,
                age: vm.form.age,
                gender: vm.form.gender === "female" ? 0 : 1,
                weight: vm.form.weight,
                height: vm.form.height,
                wrist: vm.form.gender === "female" ? 17 : 18,
                birth_date: vm.form.birthday
            }
            console.log(code)
            if (this.form.payment_method && this.form.packageSelectId)
            {
                if (this.form.payment_method === 'online-payment'){
                    vm.loading = true;
                    $.ajax({
                        type: "post",
                        url: "https://landing.bornafit.ir/api/fasttrack/paymentFastTrack.php",
                        data: user,
                        success: function (data) {
                            //console.log(data)
                            vm.response.paymentResponse = data;
                            window.location.href = vm.response.paymentResponse.url;
                            vm.response.msg = 'درحال انتقال به درگاه بانک...';
                        },
                        error: function (er) {
                            vm.loading = false;
                            //console.log(er);
                        }
                    })

                }else {
                    if ((this.userInfo.payment.credit.length >=4) && this.form.date && this.form.time){
                        vm.loading = true;
                        vm.userInfo.payment.phone = form.phone;
                        vm.userInfo.payment.payment_date = form.date.replace('تاریخ ','') + ' ' + form.time.replace('ساعت ','')+ ':00';
                        vm.userInfo.payment.amount = amount;
                        vm.userInfo.payment.product = this.selectedPackageItem.title;
                        vm.userInfo.payment.payment_method = form.payment_method;
                        vm.CardPayment();
                        vm.redirectWithParameter();
                        // $.ajax({
                        //     type: 'post',
                        //     url: 'https://crm.bornafit.ir/api/getnumber',
                        //     data: {
                        //         repositoty: 1,
                        //         topic: 41,
                        //         mobile: form.phone
                        //     },
                        //     headers: {
                        //         token: "nz9XS54cGjV7nfPfASDF@#$ASDfEHuQP3kGm2rymF"
                        //     },
                        //     dataType: 'json',
                        //     success: function (data) {
                        //         console.log(data)
                        //     },
                        //     error: function (er) {
                        //         console.log(er)
                        //     }
                        // })
                        // $.ajax({
                        //     type: 'post',
                        //     url: 'https://landing.bornafit.ir/api/payment/',
                        //     data: vm.userInfo.payment,
                        //     dataType: 'json',
                        //     success: function (data) {
                        //         console.log('the data was successfully sent to the server');
                        //         vm.childStep = 5;
                        //         vm.loading = false;
                        //         $('html,body').animate({
                        //             scrollTop: $('.bmi-register').offset().top
                        //         }, 1000);
                        //
                        //     },
                        //     error: function (er) {
                        //         $('html,body').animate({
                        //             scrollTop: $('.bmi-register').offset().top
                        //         }, 1000);
                        //         vm.childStep = 5;
                        //         vm.loading = false;
                        //     }
                        // })
                    }else {
                        this.userInfo.payment.credit.length < 4 ? $(".card-number-valid").css('color','red') : $(".card-number-valid").css('color','black')
                        !vm.form.date ? $('.date-valid').css('color','red') : $(".date-valid").css('color','black');
                        !vm.form.time ? $('.time-valid').css('color','red') : $(".time-valid").css('color','black');
                    }
                }
            }else {
                $('p.error').show()
            }
        },
        selectPackageId: function (){
            let product_id = 0;
            // if(this.selectedPackageSupportItem.id === 2 && this.selectedPackageItem.product_id === 48){
            //     product_id = 3;
            // }else if(this.selectedPackageSupportItem.id === 2 && this.selectedPackageItem.product_id === 49)
            // {
            //     product_id = 32;
            // }
            if(this.selectedPackageSupportItem.id < 2 && !this.selectedPackageSportsItem){
                product_id = this.selectedPackageSupportItem.product_id;
            }
            else if(this.selectedPackageSupportItem.id > 1 && !this.selectedPackageSportsItem){
                product_id = this.selectedPackageSupportItem.product_id;
            }
            else if(this.selectedPackageSupportItem.id < 2 && this.selectedPackageSportsItem){
                product_id = this.selectedPackageSportsItem.product_id;

            }else{
                product_id = this.selectedPackageItem.product_id;
            }
            return product_id;
        },
        reloadBmi: function (){
            var vm = this;
            var form = this.form;

            form.weight = '';
            form.height = '';
            form.age = '';
            vm.childStep -= 1;
        },
        backButtonRegister: function (){
            this.childStep--;
        },
        getDateTime: async function () {
            //let vm = this;
            let data = await $.getJSON("https://landing.bornafit.ir/api/getnumber/getDateTime.php");
            this.dateTime = data.date;
        },
        showSupport: function (){
            //let vm = this;
            var hour = this.dateTime.split(':')[0];
            if ((hour >= 9 && hour <= 22) && this.userInfo.utm_source!=='chavosh')
                this.validSupport = true;
        },
        upHundred: function (weight, normal_weight) {
            if (weight < 100) {
                weight = 0;
            } else if (normal_weight > 100) {
                weight = weight - normal_weight;
            } else if (normal_weight < 100) {
                weight = weight - 100;
            }
            return weight;
        },
        between: function (weight, normal_weight) {
            if (weight < 70 || normal_weight > 100) {
                return 0;
            }
            if (weight > 100) {
                if (normal_weight < 70) {
                    weight = 100 - 70;
                } else {
                    weight = 100 - normal_weight;
                }
            } else {
                if (normal_weight < 70) {
                    weight = weight - 70;
                } else {
                    weight = weight - normal_weight;
                }
            }
            return weight;
        },
        underSeventy: function (weight, normal_weight) {
            if (normal_weight > 70) {
                return 0;
            } else if (weight < 70) {
                weight = weight - normal_weight;
            } else {
                weight = 70 - normal_weight;
            }
            return weight;
        },
        play: function (e) {
            var video = this.$refs['video-' + e]
            video.play()
            video.setAttribute("controls", "controls");
            video.parentElement.classList.remove("has-icon");
        },
        toggleGender: function () {
            this.form.gender = this.form.gender === 'male' ? 'female' : 'male'
        },
        getUrlParameter: function (sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        },
        nextItem: function (e) {
            $(e).trigger('next.owl.carousel');
        },
        previousItem: function (e) {
            $(e).trigger('prev.owl.carousel');
        },
        getBirthday(age){
            age = new Date(age);
            const d = new Date();
            let yearNow = d.getFullYear();
            let birthYear = (yearNow - age);
            this.form.birthday = birthYear + "-01" + "-01";

            //let dateOfBirth = new Date(new Date() - birthYear);
            //this.form.birthday = dateOfBirth.toISOString().split('T')[0];

        },
        startTimerVerify(){
            this.isRunning = true
            if (!this.form.timer) {
                this.form.timer = setInterval( () => {
                    if (this.form.timeStamp > 0) {
                        this.form.timeStamp--
                    } else {
                        clearInterval(this.form.timer)
                        this.form.timer = null;
                        // this.childStep = 1;
                        this.form.registerCode = true;
                        //this.form.timeStamp = 60;
                    }
                }, 1000 )
            }
        },
        validateDietPackage(){
            var vm = this;
            var bmi = this.result.bmi;
            var weight = this.result.weight;
            if(bmi < 20){
                vm.packageType = "afzayesh";
                vm.packages = vm.packages.filter(function (item){
                    return item.type === vm.packageType;
                })
                vm.packages = vm.packages[0];
            }
            else if (bmi >= 20 && bmi < 25){
                if(weight > 0.1 && weight <=7){
                    vm.packageType = "kahesh";
                    vm.packages = vm.packages.filter(function (item){
                        return item.type === vm.packageType;
                    })
                    vm.packages = vm.packages[0];
                    vm.packages.products = vm.packages.products.filter(function (items) {
                        return items.type === "1month" || items.type === "3month";
                    })
                }else
                {
                    vm.packageType = "tasbit";
                    vm.packages = vm.packages.filter(function (item){
                        return item.type === vm.packageType;
                    })
                    vm.packages = vm.packages[0];
                }

            }
            else{
                vm.packageType = "kahesh";
                vm.packages = vm.packages.filter(function (item){
                    return item.type === vm.packageType;
                })
                vm.packages = vm.packages[0];
                if(weight > 0.1 && weight <=7){
                    vm.packages.products = vm.packages.products.filter(function (items) {
                        return items.type === "1month" || items.type === "3month";
                    })
                }else if(weight > 7){
                    vm.packages.products = vm.packages.products.filter(function (items) {
                        return items.type === "3month" || items.type === "6month";
                    })
                    console.log(vm.packages)
                }
            }
        },
        videoModal(){
            $('.drkermany_orginal_wrapper .content').slideToggle()
        },
        offerInURL(){
            let vm = this;
            if(vm.form.offer_code_url) {
                vm.loading = true;
                vm.form.offer_code_valid = false;
                vm.offerCodeCheck(vm.form.offer_code_url)
            }
            vm.childStep = 4;
            vm.getCardPaymentInfo();
            vm.sendAutomationStep(5);
        },
        sendAutomationStep: function(step, repo=1){
            let vm = this;
            let userInfo = {
                mobile: vm.form.phone,
                repositoty: repo,
                topic: vm.userInfo.topic,
                step: step
            }

            $.ajax({
                type: "post",
                url: "https://crm.bornafit.ir/api/getnumber",
                data: userInfo,
                headers: {
                    token: "nz9XS54cGjV7nfPfASDF@#$ASDfEHuQP3kGm2rymF"
                },
                success: function (data) {
                },
                error: function (er) {
                }
            })
        },
        getUserToken: function (phone){
            let vm = this;
            phone = String('98' + parseInt(phone));
            $.ajax({
                type: "post",
                url: "https://fasting.bornafit.ir/behandam-diet/api/login/",
                data: {
                    mobile: phone,
                    password: 123456
                },
                success: function (data) {
                    vm.form.token = data.data.token;
                },
                error: function (er) {
                }
            })
        },
        getCardPaymentInfo: function (){
            let vm = this;
            $.ajax({
                type: "post",
                url: "https://fasting.bornafit.ir/behandam-diet/api/payment/card-account-payment",
                headers: {
                    "Authorization": "Bearer "+vm.form.token
                },
                success: function (data) {
                    vm.form.card_payment_img_url = data.data.img_url
                    vm.form.card_payment_id = data.data.id
                },
                error: function (er) {
                }
            })
        },
        CardPayment: function (){
            let vm = this;

            let code = vm.form.offerCode;
            if(vm.form.offer_code_url){
                if(vm.form.offer_code_list.indexOf(vm.form.offer_code_url) != -1){
                    code = vm.form.offer_code_url;
                }
            }

            let info = {
                card_owner: vm.userInfo.name+" "+vm.userInfo.family,
                card_number: vm.userInfo.payment.credit,
                payed_at: vm.jalaliToGregorian(),
                time_payed: vm.form.time,
                account_id: vm.form.card_payment_id,
                coupon: code,
                origin_id: 0,
                payment_type_id: 1
            }
            $.ajax({
                type: "post",
                url: "https://fasting.bornafit.ir/behandam-diet/api/payment/landing-latest-invoice",
                data: info,
                headers: {
                    "Authorization": "Bearer "+vm.form.token
                },
                success: function (data) {
                },
                error: function (er) {
                }
            })
        },
        redirectWithParameter: function (){
            let vm = this;
            let phone = String('98' + parseInt(vm.form.phone));
            window.location.href = `https://landing.bornafit.ir/pay/fast?status=true&type=cardpayment&mobile=${phone}`;
        },
        jalaliToGregorian: function (){
            let vm = this;
            let JalaliDate = {
                g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
            };
            JalaliDate.jalaliToGregorian = function(j_y, j_m, j_d) {
                j_y = parseInt(j_y);
                j_m = parseInt(j_m);
                j_d = parseInt(j_d);
                var jy = j_y - 979;
                var jm = j_m - 1;
                var jd = j_d - 1;

                var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
                for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

                j_day_no += jd;

                var g_day_no = j_day_no + 79;

                var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
                g_day_no = g_day_no % 146097;

                var leap = true;
                if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
                {
                    g_day_no--;
                    gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
                    g_day_no = g_day_no % 36524;

                    if (g_day_no >= 365) g_day_no++;
                    else leap = false;
                }

                gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
                g_day_no %= 1461;

                if (g_day_no >= 366) {
                    leap = false;

                    g_day_no--;
                    gy += parseInt(g_day_no / 365);
                    g_day_no = g_day_no % 365;
                }

                for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
                    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
                var gm = i + 1;
                var gd = g_day_no + 1;

                gm = gm < 10 ? "0" + gm : gm;
                gd = gd < 10 ? "0" + gd : gd;
                return [gy, gm, gd];
            }
            var date = vm.form.date.replace('تاریخ ', '')
            var dateSplitted = date.split("-"),
                jD = JalaliDate.jalaliToGregorian(dateSplitted[0], dateSplitted[1], dateSplitted[2]);
            var jResult = jD[0] + "-" + jD[1] + "-" + jD[2];
            return jResult;
        },
    },
    computed: {
        prettyTime () {
            let time = this.form.timeStamp / 60
            let minutes = parseInt(time)
            let secondes = Math.round((time - minutes) * 60)
            return minutes+":"+secondes
        },
        invalidTel: function () {
            var tel = this.form.phone;
            return tel !== '' && !/^(|0)?9\d{9}$/.test(tel);
        },
        invalidName: function () {
            var name = this.form.name;
            return name !== '' && !/^((.*[\u0600-\u06FF\s]|[a-zA-Z]){3,30})+$/.test(name);
        },
        invalidFamily: function () {
            var family = this.form.family;
            return family !== '' && !/^((.*[\u0600-\u06FF\s]|[a-zA-Z]){3,30})+$/.test(family);
        },
        mini: function () {
            return this.getUrlParameter('mini')
        },
        invalidPass: function () {
            return this.form.password !== this.form.rePassword
        },
        selectedPackageItem() {
            return this.packages.products.find(x => x.id === this.form.packageSelectId) || null
        },
        selectedPackageSupportItem() {
            if(this.selectedPackageItem){
                return this.selectedPackageItem.option.support.find(x => x.id === this.packagesSupportSelectId) || null
            }
        },
        selectedPackageSportsItem() {
            if(this.selectedPackageItem && this.packagesSportsSelectId){
                return this.selectedPackageItem.option.exercise.find(x => x.id === 1) || null
            }
        },
        invalidWight() {
            var weight = this.form.weight;
            return weight !== '' && !/^(2[0-9]|[3-9][0-9]|1[0-9]{2}|200)$/.test(weight);
        },
        invalidHeight() {
            var height = this.form.height;
            return height !== '' && !/^(10[0-9]|1[1-9][0-9]|2[0-2][0-9]|230)$/.test(height);
        },
        invalidAge() {
            var age = this.form.age;
            return age !== '' && !/^(1[2-9]|[2-6][0-9]|70)$/.test(age);
        },
        invalidWrist() {
            var wrist = this.form.wrist;
            return wrist !== '' && !/^(1[2-9]|[2-6][0-9]|70)$/.test(wrist);
        },
        validRegForm() {
            let status = true
            Object.entries(this.formInputList).map(([key, value]) => {
                if (value.hasError)
                    status = false
            })
            return status
        },

        selectedcountryListItem()  {
            return this.countryListCodeData.find(x => x.code === this.countryListSelectId) || {}
        },
        validationPhone(){
            var phone = this.form.phone;
            return phone !== '' && !(this.selectedcountryListItem.regex ? this.selectedcountryListItem.regex.test(phone) : true);
        },
        validationPhoneCharacter(){
            return this.selectedcountryListItem.code === "IR" ? 11 : 25
        },
        returnSumPrice(){
            let selectedPackageItem = 0;
            let selectedPackageItemOffer = 0;
            let selectedPackageSupportItem = 0;
            let selectedPackageSupportItemOffer = 0;
            let selectedPackageSportsItem = 0;
            let selectedPackageSportsItemOffer = 0;
            if(this.selectedPackageItem){
                selectedPackageItem = this.selectedPackageItem.price.amount;
                selectedPackageItemOffer = this.selectedPackageItem.price.amount - this.selectedPackageItem.price.offer;
            }
            if(this.selectedPackageSupportItem){
                selectedPackageSupportItem = this.selectedPackageSupportItem.price.amount;
                selectedPackageSupportItemOffer = this.selectedPackageSupportItem.price.amount - this.selectedPackageSupportItem.price.offer;
            }
            if(this.selectedPackageSportsItem){
                selectedPackageSportsItem = this.selectedPackageSportsItem.price.amount;
                selectedPackageSportsItemOffer = this.selectedPackageSportsItem.price.amount - this.selectedPackageSportsItem.price.offer;
            }
            return {
                selectedPackageItemSum: ((selectedPackageItemOffer * 1000) + (selectedPackageSupportItemOffer * 1000) + (selectedPackageSportsItemOffer * 1000)).toLocaleString(),
                selectedPackageItemSumOrigin: ((selectedPackageItem * 1000) + (selectedPackageSupportItem * 1000) + (selectedPackageSportsItem * 1000)).toLocaleString(),
                selectedPackageItemSumOffer: (((selectedPackageItem - selectedPackageItemOffer) * 1000) + ((selectedPackageSupportItem - selectedPackageSupportItemOffer) * 1000) + ((selectedPackageSportsItem - selectedPackageSportsItemOffer) * 1000)).toLocaleString()

            }

        },
        packageValidate(){
            return Object.keys(this.selectedPackageItem).length === 0
        },
        getLocalDateTime(){
            let yourDate = new Date()
            return yourDate.toISOString().split('T')[0]
        },
        verifyat(){
            let vm = this;
            let verify = vm.form.verify;

            return verify.toString().length < 4 || !vm.form.isverify
        }
    },
    components: {
        CInput: ComponentInput,
        timer: Timer,
        CCount: CounterInput
    },
    watch: {
        'step': function (val){
            if( val == 2 ) {
                app.sliderStatus = true
            }
            this.$nextTick(() => {
                setTimeout(() => {

                    $('.owl-slider').owlCarousel({
                        items: 1,
                        autoplay: true,
                        loop: true,
                        margin: 15,
                        rtl: true,
                        dots: true,
                        nav: false,
                        navText: ["<i class=''></i>","<i class=''></i>"],
                        responsive: {
                            0: {
                                items: 1
                            },
                        }
                    });

                    var $owl = $('#customers-testimonials .owl-carousel');
                    $owl.children().each( function( index ) {
                        $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
                    });

                    $('#customers-testimonials .owl-carousel').owlCarousel({
                        loop: true,
                        center: true,
                        items: 3,
                        margin: 0,
                        rtl: true,
                        autoplay: true,
                        dots:false,
                        lazyload: true,
                        autoplayTimeout: 8500,
                        smartSpeed: 450,
                        responsive: {
                            0: {items: 3 },
                            400: {items: 3},
                            700: {items: 3},
                            880: {items: 3},
                            1024: {items: 3},
                            1200: {items: 3},
                        }
                    });

                    $(".tel-input-container .input_country_tel").select2({
                        templateResult: function (idioma) {
                            var $span = $("<span><img style='width: 18px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/> " + idioma.text + "</span>");
                            return $span;
                        },
                        templateSelection: function (idioma) {
                            var $span = $("<span><img style='width: 22px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/></span>");
                            return $span;
                        },
                        dropdownAutoWidth: true,
                        width: 'auto'
                    }).on("select2:select", e => {
                        const event = new Event("change", { bubbles: true, cancelable: true });
                        e.params.data.element.parentElement.dispatchEvent(event);
                    })
                        .on("select2:unselect", e => {
                            const event = new Event("change", { bubbles: true, cancelable: true });
                            e.params.data.element.parentElement.dispatchEvent(event);
                        });

                }, 600)
            });
        },
        'childStep': function (val){
            let vm = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    $(".tel-input-container .input_country_tel").select2({
                        templateResult: function (idioma) {
                            var $span = $("<span><img style='width: 18px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/> " + idioma.text + "</span>");
                            return $span;
                        },
                        templateSelection: function (idioma) {
                            var $span = $("<span><img style='width: 22px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/></span>");
                            return $span;
                        },
                        dropdownAutoWidth: true,
                        width: 'auto'
                    }).on("select2:select", e => {
                        const event = new Event("change", { bubbles: true, cancelable: true });
                        e.params.data.element.parentElement.dispatchEvent(event);
                    })
                        .on("select2:unselect", e => {
                            const event = new Event("change", { bubbles: true, cancelable: true });
                            e.params.data.element.parentElement.dispatchEvent(event);
                        });

                }, 600)
                if(vm.step === 3 && val === 3 && vm.packageType === "afzayesh"){
                    vm.childStep = 2;
                }
            });
        }
    }
})
$('.owl-slider').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    margin: 15,
    rtl: true,
    dots: true,
    nav: false,
    navText: ["<i class=''></i>","<i class=''></i>"],
    responsive: {
        0: {
            items: 1
        },
    }
});



$(document).on('click', '.scroll-to', function (e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $('#register').offset().top - 80
    }, 1000);
});


function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        if($(element).length){
            var elementTop = $(element).offset().top;
            var elementBottom = elementTop + $(element).height();
        }


        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();


$(document).ready(function() {
    $('.alt-1').countDown({
        css_class: 'countdown-alt-1'
    });

    var $owl = $('#customers-testimonials .owl-carousel');
    $owl.children().each( function( index ) {
        $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
    });

    $('#customers-testimonials .owl-carousel').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        rtl: true,
        autoplay: true,
        dots:false,
        lazyload: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
            0: {items: 3 },
            400: {items: 3},
            700: {items: 3},
            880: {items: 3},
            1024: {items: 3},
            1200: {items: 3},
        }
    });

    $(document).on('click', '#customers-testimonials .owl-item>div', function() {
        // see https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html#to-owl-carousel
        var $speed = 300;  // in ms
        $owl.trigger('to.owl.carousel', [$(this).data( 'position' ), $speed] );
    });


    $(".tel-input-container .input_country_tel").select2({
        templateResult: function (idioma) {
            var $span = $("<span><img style='width: 18px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/> " + idioma.text + "</span>");
            return $span;
        },
        templateSelection: function (idioma) {
            var $span = $("<span><img style='width: 22px;margin-right: 2px;' src='https://flagicons.lipis.dev/flags/4x3/"+idioma.title+".svg'/></span>");
            return $span;
        },
        dropdownAutoWidth: true,
        width: 'auto'
    }).on("select2:select", e => {
        const event = new Event("change", { bubbles: true, cancelable: true });
        e.params.data.element.parentElement.dispatchEvent(event);
    })
        .on("select2:unselect", e => {
            const event = new Event("change", { bubbles: true, cancelable: true });
            e.params.data.element.parentElement.dispatchEvent(event);
        });

});



$(document).scroll(function(){
    var isElementInView = Utils.isElementInView('.btn-hide', false);
    //console.log(isElementInView)
    if (isElementInView) {
        $('.cta-button').removeClass('cta-active')
    } else {
        $('.cta-button').addClass('cta-active')
    }
});




