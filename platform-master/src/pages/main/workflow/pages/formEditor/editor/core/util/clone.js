import { cloneDeep } from "lodash"

// Error imports needed for declaration generation (declaration:true in tsconfig)
import { findByUUID, isUUIDError } from "./schemasUtil"

/**
 * Clones the whole root tree, matches the element by UUID in the new tree and returns a handle to it.
 * Returns an error when the clone process didn't work or the cloned root, if no uuid was provided.
 */
export const cloneTree = (root, uuid) => {
  const clonedRoot = cloneDeep(root)
  return uuid ? findByUUID(clonedRoot, uuid) : clonedRoot
}

export const withCloneTree = (rootTree, elementUUID, fallback, process) => {
  const clonedElement = cloneTree(rootTree, elementUUID)
  if (isUUIDError(clonedElement)) {
    console.error(
      "An error occured when cloning element with UUID",
      elementUUID
    )
    // Do nothing
    return fallback
  }
  return process(clonedElement)
}

/**
 * Convenience wrapper to clone two trees at the same time.
 */
export const withCloneTrees = (
  rootTree1,
  uuid1,
  rootTree2,
  uuid2,
  fallback,
  process
) =>
  withCloneTree(rootTree1, uuid1, fallback, clonedElement1 =>
    withCloneTree(rootTree2, uuid2, fallback, clonedElement2 =>
      process(clonedElement1, clonedElement2)
    )
  )
