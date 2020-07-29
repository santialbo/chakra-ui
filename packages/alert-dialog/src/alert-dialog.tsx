import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalProps,
} from "@chakra-ui/modal"
import * as React from "react"

export interface AlertDialogProps extends Omit<ModalProps, "initialFocusRef"> {
  leastDestructiveRef: ModalProps["initialFocusRef"]
}

export function AlertDialog(props: AlertDialogProps) {
  const { leastDestructiveRef, ...rest } = props
  return <Modal {...rest} initialFocusRef={leastDestructiveRef} />
}

export const AlertDialogContent: React.FC<ModalContentProps> = React.forwardRef(
  function AlertDialogContent(props: ModalContentProps, ref: React.Ref<any>) {
    return <ModalContent ref={ref} role="alertdialog" {...(props as any)} />
  },
)

export {
  ModalBody as AlertDialogBody,
  ModalHeader as AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
  ModalCloseButton as AlertDialogCloseButton,
  ModalOverlay as AlertDialogOverlay,
} from "@chakra-ui/modal"
