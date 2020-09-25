<template>
  <el-form ref="form" v-model="form" :label-width="labelWidth" :inline="inline">
    <el-form-item v-for="(item, index) in formLabel" :key="index" :label="item.label">
      <el-input v-if="!item.type" v-model="form[item.key]" :placeholder="item.placeholder" />
      <el-select v-else-if="item.type === 'select'" v-model="form[item.key]" :placeholder="item.placeholder">
        <el-option v-for="(subitem, subindex) in item.options" :key="subindex" :label="subitem.label" :value="subitem.value" />
      </el-select>
      <el-date-picker v-else-if="item.type === 'date'" v-model="form[item.key]" type="date" :placeholder="item.placeholder" />
      <el-switch v-else-if="item.type === 'switch'" v-model="form[item.key]" />
      <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="form[item.key]">
        <el-checkbox v-for="(subitem, subindex) in item.options" :key="subindex" :label="subitem.label" :name="item.name" />
      </el-checkbox-group>
      <el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.key]">
        <el-radio v-for="(subitem, subindex) in item.options" :key="subindex" :label="subitem.label" />
      </el-radio-group>
      <el-input v-else-if="item.type === 'textarea'" v-model="form[item.key]" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button v-for="(item, index) in buttons" :key="index" :type="item.theme" @click="onSubmit(item.submit)">{{ item.text }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // 自定义表单组件
  name: 'CustomForm',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    formLabel: {
      type: Array,
      default() {
        return []
      }
    },
    inline: Boolean,
    labelWidth: {
      type: String,
      default: '80px'
    },
    buttons: {
      type: Array,
      default() {
        return [
          {
            theme: 'primary',
            submit: true,
            text: '提交'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit(submit) {
      if (submit) {
        this.$emit('submit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
