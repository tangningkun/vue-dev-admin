<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-06 11:16:27
 * @ Modified by: TANGNK
 * @ Modified time: 2024-03-02 17:19:43
 * @ Description:
 -->

<template>
    <a-tabs v-model:active-key="attributeKey" :centered="true">
        <a-tab-pane key="componentTab" :tab="t('components.basic.design.com.component')">
            <a-collapse v-model:activeKey="collapseComKey" h-full w-full expand-icon-position="end">
                <a-collapse-panel key="layoutField" :header="t('components.basic.design.com.layoutField')">
                    <draggable
                        v-if="isNotEmptyArray(layoutFields) && layoutFields.length > 0"
                        tag="ul"
                        item-key="key"
                        ghost-class="ghost"
                        :list="layoutFields"
                        :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                        :sort="false"
                        :move="onCheckMove"
                        :clone="onCloneField"
                    >
                        <template #item="{ element: fld }">
                            <li class="field-widget-item" :title="fld.displayName">
                                <Icon v-if="fld.icon" :icon="fld.icon" mr-2 />
                                {{ fld.displayName }}
                            </li>
                        </template>
                    </draggable>
                    <a-empty v-else :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
                </a-collapse-panel>
                <a-collapse-panel key="basisField" :header="t('components.basic.design.com.basisField')">
                    <!-- <draggable> </draggable> -->
                    <draggable
                        v-if="isNotEmptyArray(basicFields)"
                        tag="ul"
                        ghost-class="ghost"
                        item-key="key"
                        :list="basicFields"
                        :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                        :sort="false"
                        :move="onCheckMove"
                        :clone="onCloneField"
                    >
                        <!-- :move="checkFieldMove"
                                :clone="handleFieldWidgetClone" -->
                        <template #item="{ element: fld }">
                            <li class="field-widget-item" :title="fld.displayName">
                                <Icon v-if="fld.icon" :icon="fld.icon" mr-2 />
                                {{ fld.displayName }}
                            </li>
                        </template>
                    </draggable>
                    <a-empty v-else :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
                </a-collapse-panel>
                <a-collapse-panel key="advancedField" :header="t('components.basic.design.com.advancedField')">
                    <draggable
                        v-if="isNotEmptyArray(advancedFields) && advancedFields.length > 0"
                        tag="ul"
                        item-key="key"
                        ghost-class="ghost"
                        :list="advancedFields"
                        :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                        :sort="false"
                    >
                        <!-- :move="checkFieldMove"
                                :clone="handleFieldWidgetClone" -->
                        <template #item="{ element: fld }">
                            <li class="field-widget-item" :title="fld.displayName">
                                <Icon v-if="fld.icon" :icon="fld.icon" mr-2 />
                                {{ fld.displayName }}
                            </li>
                        </template>
                    </draggable>
                    <a-empty v-else :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
                </a-collapse-panel>
                <a-collapse-panel key="customField" :header="t('components.basic.design.com.customField')">
                    <draggable
                        v-if="isNotEmptyArray(customFields) && customFields.length > 0"
                        tag="ul"
                        item-key="key"
                        ghost-class="ghost"
                        :list="customFields"
                        :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                        :sort="false"
                    >
                        <!-- :move="checkFieldMove"
                                :clone="handleFieldWidgetClone" -->
                        <template #item="{ element: fld }">
                            <li class="field-widget-item" :title="fld.displayName">
                                <Icon v-if="fld.icon" :icon="fld.icon" mr-2 />
                                {{ fld.displayName }}
                            </li>
                        </template>
                    </draggable>
                    <a-empty v-else :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
                </a-collapse-panel>
            </a-collapse>
        </a-tab-pane>

        <a-tab-pane key="nodeTreeTab" :tab="t('components.basic.design.com.nodeTree')">
            <a-empty :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
        </a-tab-pane>

        <a-tab-pane key="templateTab" :tab="t('components.basic.design.com.template')">
            <a-empty :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
        </a-tab-pane>
    </a-tabs>
</template>
<script lang="ts" setup name="BasicDesignWidget">
    import { computed, ref, unref } from 'vue';
    import { Empty } from 'ant-design-vue';
    import { useI18n } from '/@/hooks/web/useI18n';
    import { useBasicDesignMethod } from '../../hooks/useBasicDesignMethod';
    import draggable from 'vue3-draggable-next';
    import { LFS, BFS, AFS, CFS } from './data/index';
    import Icon from '/@/components/Icon/index';
    import { buildRandomID } from '/@/utils/uuid';
    import { isNotEmptyArray } from '/@/utils/is';
    import { FieIdTypeAttr } from './types';
    // import { useDesignContext, SymbolKey } from '../../hooks/useBasicDesignContext';
    const { t } = useI18n();
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    const attributeKey = ref('componentTab');
    const collapseComKey = ref(['layoutField', 'basisField', 'advancedField', 'customField']);

    //#region【Props】

    const props = defineProps({
        designer: { type: Object },
    });
    const designer: any = computed(() => {
        const { designer } = unref(props);
        return designer;
    });
    console.log('BasicDesignWidget===>', designer);
    //#endregion

    //#region 【provide/inject】
    // const aa = useDesignContext(SymbolKey);
    // console.log(aa);
    //#endregion

    //#region 【组件库处理】

    const layoutFields: Array<FieIdTypeAttr> = LFS.map((fld) => {
        return {
            key: buildRandomID(),
            ...fld,
            displayName: t(`components.basic.design.widgetLabel.${fld.type}`),
        };
    }).filter((fld) => {
        return !fld.internal; //&& !this.isBanned(con.type);
    });
    const basicFields: Array<FieIdTypeAttr> = BFS.map((fld) => {
        return {
            key: buildRandomID(),
            ...fld,
            displayName: t(`components.basic.design.widgetLabel.${fld.type}`),
        };
    }).filter((_fld) => {
        // return !this.isBanned(fld.type);
        return true;
    });

    const advancedFields: Array<FieIdTypeAttr> = AFS;
    // .map((fld) => {
    //     return {
    //         key: buildRandomID(),
    //         ...fld,
    //         displayName: t(`components.basic.design.widgetLabel.${fld.type}`),
    //     };
    // }).filter((_fld) => {
    //     // return !this.isBanned(fld.type);
    //     return true;
    // });

    const customFields: Array<FieIdTypeAttr> = CFS;
    // .map((fld) => {
    //     return {
    //         key: buildRandomID(),
    //         ...fld,
    //         displayName: t(`components.basic.design.widgetLabel.${fld.type}`),
    //     };
    // }).filter((_fld) => {
    //     // return !this.isBanned(fld.type);
    //     return true;
    // });

    //#endregion

    const { onCheckMove, onCloneField } = useBasicDesignMethod();
</script>
<style lang="less"></style>
