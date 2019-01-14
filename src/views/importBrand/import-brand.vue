<style lang="less" scoped>
@import "../../config/index.less";

#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  background: #ffffff;
  padding-left: 10px;
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.fotter {
  margin-top: 20px;
  button {
    margin-right: 30px;
  }
}
.upDate {
  cursor: pointer;
  text-align: center;
  border: 1px solid #aeaeae;
  padding: 2px 12px;
  margin-right: 10px;
  width: 150px;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">工具箱</h2> -->
      <div class="main-container">
        <Button type="primary" @click="showImportBrand = true">品牌导入</Button>
      </div>

      <!--品牌导入 -->
      <myModal class="myModal"
            @close="closeModal"
            :modal="showImportBrand">
            <div slot="main" class="modal-main">
              <h3>品牌导入</h3>
              <div class="modal-table">
                  <Form ref="form" :label-width="88">
                      <div style="overflow:hidden;">
                          <div class='upDate'>
                              <Upload :action="importUrl" 
                              :show-upload-list=false
                              :on-success='handleSuccess'
                              :on-error='handleError'
                              >
                              <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                              <span>{{ importBrandData.uploadText }}</span>
                              </Upload>
                          </div>
                      </div>
                      <div class="fotter" style="text-align:center;">
                          <Button @click="closeModal" type="primary">取消</Button>
                          <Button @click="importExcel" type="success">导入</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
export default {
  name: "import-brand",
  components: { myModal },
  data() {
    return {
      importUrl: config.uploadFile,
      showImportBrand: false,
      importBrandData: {
        loadFilePath: "",
        uploadText: "请选择上传文件"
      }
    };
  },
  watch: {
    showImportBrand(val) {
      if (!val) {
        this.importBrandData.uploadText = "请选择上传文件";
        this.importBrandData.loadFilePath = "";
      }
    }
  },
  methods: {
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.importBrandData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.importBrandData.loadFilePath = url;
      }
    },
    importExcel() {
      if (!this.importBrandData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "brand/brandInfoImport.json",
        {
          loadFilePath: this.importBrandData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.showImportBrand = false;
        }
      );
    },
    closeModal() {
      this.showImportBrand = false;
    }
  }
};
</script>