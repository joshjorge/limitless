FilePond.registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileEncode,
    FilePondPluginImageEdit
);
FilePond.parse(document.body);

// FilePond.create(document.querySelector('filepond'), {
//     labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
//     imagePreviewHeight: 170,
//     imageCropAspectRatio: '1:1',
//     imageResizeTargetWidth: 200,
//     imageResizeTargetHeight: 200,
//     stylePanelLayout: 'compact circle',
//     styleLoadIndicatorPosition: 'center bottom',
//     styleProgressIndicatorPosition: 'right bottom',
//     styleButtonRemoveItemPosition: 'left bottom',
//     styleButtonProcessItemPosition: 'right bottom',
// });