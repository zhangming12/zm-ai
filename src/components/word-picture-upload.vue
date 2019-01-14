<style lang="less" scoped>
    .upDate{
        float: right;
        border: 1px solid #aeaeae;
        padding: 2px 12px;
        margin-right: 10px;
        margin-top: 4px;
        color: #333;
        cursor: pointer;
    }
</style>
<template>
    <div class='upDate'>
        <Upload :action="urlOssPath" 
            :show-upload-list=false
            :format="uploadFormatType"
            :on-success='handleSuccess'
            :on-error='handleError'
            :on-format-error="handleFormatError"
            >
            <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
            {{ uploadText }} 
        </Upload>
    </div>
</template>
<script>

import config from '@/util/config.js';
export default {
    props:{  
        wordUploadFlag:Boolean  ,//上传成功标识，true则清空上传文字   
    },
    data(){
        return {
            urlOssPath: config.uploadWorkerExcel,//上传图片oss路径
            uploadText:'选择上传文件',
            uploadSuccessUrl:'',//上传图片成功后路径
            uploadFormatType:['xls','xlsx'],
        }
    },
    watch:{        
        wordUploadFlag(val){
            if(val===true){
                this.uploadText='选择上传文件';
                this.uploadSuccessUrl = '';
                this.$emit('wordPicturnUploadSuccess',null,false);     
            }
        }
    },
    methods:{        
        handleSuccess(response,file,fileList){            
            this.uploadText = file.name;
            var url = response.data;            
            if( url ){                
                this.uploadSuccessUrl = url; 
                this.$emit('wordPicturnUploadSuccess',url)               
            }
        },
        handleError(){

        },
        handleFormatError(file){
            let typeStr = '';
            
            this.uploadFormatType.forEach( ( item, i ) => {                
                if(i+1 === this.uploadFormatType.length){
                    typeStr += item;
                }else{
                    typeStr += item + '或';
                }                
            } );
            this.$Notice.warning({
                title: '文件格式不正确',
                // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                desc: `文件${file.name} 格式不正确，请上传${typeStr}格式的图片。`
            });
        },
    }
}
</script>
