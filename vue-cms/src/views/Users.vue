<template>
    <div class="users">
        <Button type="primary" @click="addData">Add</Button>
        <Button type="error" @click="removesData">Delete</Button>
        <Input search v-model="name" @on-search="searchData" placeholder="Search by username..." />
        <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
        <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5, 10, 20, 30, 40, 50]"/>
        <Modal v-model="modal1"
               title="Common Modal dialog box title"
               @on-ok="ok"
               @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="Password" prop="password">
                    <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Base } from '@/mixins/Base';

    export default Vue.extend( {
        mixins: [Base],
        data() {
            return {
                formValidate: {
                    name: '',
                    password: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: 'Name cannot be empty', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Password cannot be empty', trigger: 'blur'},
                    ]
                },
                modal1: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Password',
                        key: 'password'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (this: Vue, h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index)
                                            this.editData(params.row._id);
                                        }
                                    }
                                }, 'Modify'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeData(params.row._id);
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ]
            };
        },
    })
</script>
