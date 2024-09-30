export class CategorizationServiceImpl {
  parentUuids = new Map()
  selectedTabs = new Map()

  getTabSelection = categorization => this.selectedTabs.get(categorization.uuid)

  setTabSelection = (categorization, selection) => {
    this.selectedTabs.set(categorization.uuid, selection)

    if (!this.parentUuids.has(categorization.uuid)) {
      // capture element parents that are Categorization or Category
      this.parentUuids.set(
        categorization.uuid,
        this.getParentCategoryIds(categorization.parent)
      )
    }
  }

  clearTabSelections = () => {
    this.selectedTabs.clear()
    this.parentUuids.clear()
  }

  removeElement = element => {
    // no need to hold the memory for Map entry in this case
    this.selectedTabs.delete(element.uuid)
    this.parentUuids.delete(element.uuid)

    this.parentUuids.forEach((parents, uuid, map) => {
      if (parents.includes(element.uuid)) {
        map.delete(uuid)
        this.selectedTabs.delete(uuid)
      }
    })
  }

  getParentCategoryIds = categorization => {
    if (categorization === undefined) {
      return []
    }
    if (
      categorization.type === "Categorization" ||
      categorization.type === "Category"
    ) {
      return [
        categorization.uuid,
        ...this.getParentCategoryIds(categorization.parent)
      ]
    } else {
      return this.getParentCategoryIds(categorization.parent)
    }
  }
}
