import {useMemo} from 'react'
import {MarkdownInput, MarkdownInputProps} from 'sanity-plugin-markdown'

export function CustomMarkdownInput(props) {
  const reactMdeProps: MarkdownInputProps['reactMdeProps'] = useMemo(() => {
    return {
      options: {
        minHeight: '800px',
        previewImagesInEditor: true,

        // more options available, see:
        // https://github.com/Ionaru/easy-markdown-editor#options-list
      },
      // more props available, see:
      // https://github.com/RIP21/react-simplemde-editor#react-simplemde-easymde-markdown-editor
    }
  }, [])

  return <MarkdownInput {...props} reactMdeProps={reactMdeProps} />
}
