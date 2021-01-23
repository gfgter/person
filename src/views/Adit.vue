<template>
    <div>
        <header style="color:#000">
            <van-nav-bar left-text="返回" right-text="发表" left-arrow @click-left="$router.back()"
                @click-right="fabiao" />
        </header>
        <div style="padding:0 13%">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="9" />
        </div>
        <div style="padding:0 13%">
            <textarea name="edit" id="" cols="30" rows="5" v-model="events"
                style="width:100%;font-size:16px"></textarea>
        </div>

    </div>
</template>



<script>
    export default {
        name: 'Adit',
        data() {
            return {
                fileList: [],
                file1: [],
                events: '',
                useerInfo: ''
            }
        },
        methods: {
            async afterRead(file) {
                console.log('end');
                console.log(file);
                //   let arr = []
                if (!Array.isArray(file)) {
                    file = [file]
                }
                file.forEach(item => {
                    this.file1.push(item.content)
                    // arr.push(item.content)
                });
                //   console.log('arredede',arr);
                //   console.log('filelist',this.fileList);
                //   this.file = arr;
                //   let data = {
                //     userId:"6005a09a454af942d9a62e45",//发送用户的id
                //     media:arr,//读取图片base64集合
                //     description:this.events//文字内容
                //   }

                //   let result = await this.$ajax.post('http://localhost:2008/api/circle/addCircle', {data});
                //   console.log('result',result);

            },
            async fabiao() {
                let data = {
                    userId: this.userInfo._id, //发送用户的id:6005a09a454af942d9a62e45
                    media: this.file1, //读取图片base64集合
                    description: this.events //文字内容
                }
                console.log(data);
                let result = await this.$ajax.post('/circle/addCircle', {
                    data
                });
                console.log('result', result);
                this.file1 = [];
                this.$router.push('/circle')
            },


        },
        created() {
            this.userInfo = this.$store.state.user.userInfo
        }
    }
</script>