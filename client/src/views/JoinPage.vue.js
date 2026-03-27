import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const code = ref('');
const name = ref('');
const error = ref('');
const canJoin = computed(() => code.value.length >= 4 && name.value.trim().length >= 2);
function joinGame() {
    if (!canJoin.value)
        return;
    error.value = '';
    // TODO: validate code via WebSocket
    router.push(`/lobby/${code.value.trim()}`);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "join" },
});
/** @type {__VLS_StyleScopedClasses['join']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "bg-overlay" },
});
/** @type {__VLS_StyleScopedClasses['bg-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push('/');
            // @ts-ignore
            [router,];
        } },
    ...{ class: "back-btn" },
});
/** @type {__VLS_StyleScopedClasses['back-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "subtitle" },
});
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "field-label" },
});
/** @type {__VLS_StyleScopedClasses['field-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.code = __VLS_ctx.code.toUpperCase();
            // @ts-ignore
            [code, code,];
        } },
    value: (__VLS_ctx.code),
    ...{ class: "field-input code-input" },
    type: "text",
    placeholder: "BNK-XXXX",
    maxlength: "8",
    spellcheck: "false",
    autocomplete: "off",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
/** @type {__VLS_StyleScopedClasses['code-input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "field-label" },
});
/** @type {__VLS_StyleScopedClasses['field-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onKeyup: (__VLS_ctx.joinGame) },
    value: (__VLS_ctx.name),
    ...{ class: "field-input" },
    type: "text",
    placeholder: "Survivor...",
    maxlength: "20",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-msg" },
    });
    /** @type {__VLS_StyleScopedClasses['error-msg']} */ ;
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.joinGame) },
    ...{ class: "btn-main" },
    disabled: (!__VLS_ctx.canJoin),
});
/** @type {__VLS_StyleScopedClasses['btn-main']} */ ;
// @ts-ignore
[code, joinGame, joinGame, name, error, error, canJoin,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=JoinPage.vue.js.map