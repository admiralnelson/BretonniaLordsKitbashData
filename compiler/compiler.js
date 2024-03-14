const fs = require('fs')
const path = require('path')


/**
 * Reads *.json and parses it then concatenate it as big array
 * @returns {Array<object>}
 */
function ReadArmouryDefinitions() {
    const directoryPath = path.join(__dirname, '../armoury_definitions')
    let result = []

    const files = fs.readdirSync(directoryPath)

    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json')

    for (let file of jsonFiles) {
        const filePath = path.join(directoryPath, file)
        const data = fs.readFileSync(filePath)
        
        const objects = JSON.parse(data)
        objects.forEach(object => {
            const keys = [
                'ItemName', 
                'LocalisedName', 
                'Description', 
                'Type', 
                'IsItemDefinedFromAncillary', 
                'AssociatedWithArmouryItemSet', 
                'Skeleton', 
                'ItemCategory', 
                'UiIcon', 
                'Thumbnail', 
                'UnitCardThumbnail', 
                "VariantMeshScale", 
                "VariantMeshScale", 
                "VariantMeshMountScale", 
                "AssociatedAncillaryKey",
                "BattleAnimation",
                "CampaignAnimation",
                "OnlyCompatibleWithItem"
            ]
            keys.forEach(key => {
                if (!(key in object)) {
                    throw new Error(`Missing key ${key} in object ${JSON.stringify(object)}`)
                }
            })
        })

        result = result.concat(objects)
    }

    return result
}

/**
 * Reads *.json and parse it then concat as big array
 * @returns {Array<object>}
 */
function ReadArmouryData() {
    const directoryPath = path.join(__dirname, '../armoury_data')
    let result = []

    const files = fs.readdirSync(directoryPath)

    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json')

    for (let file of jsonFiles) {
        const filePath = path.join(directoryPath, file)
        const data = fs.readFileSync(filePath)
        
        const objects = JSON.parse(data)
        objects.forEach(object => {
            const keys = [
                'SubtypeKey', 
                'Skeleton', 
                'DefaultArmoryItemSet', 
            ]
            keys.forEach(key => {
                if (!(key in object)) {
                    throw new Error(`Missing key ${key} in object ${JSON.stringify(object)}`)
                }
            })
        })

        result = result.concat(objects)
    }

    return result

}

const ArmouryDefs = ReadArmouryDefinitions()
const ArmouryData = ReadArmouryData()

/**
 * Validates before compiling
 * Like checking if the same subtypekey has been redefined again
 */

/**
 * Runs check against ArmouryData
 * If found another same SubtypeKey, it throws an exception
 */
function CheckForDuplicateSubtypeKey() {
    const seen = new Set();

    for (const object of ArmouryData) {
        if (seen.has(object.SubtypeKey)) {
            throw new Error(`Duplicate SubtypeKey found: ${object.SubtypeKey}`);
        }
        seen.add(object.SubtypeKey);
    }
}

function CheckForInvalidTypes() {
    let errored = false
    for (const def of ArmouryDefs) {
        const types = ["cape", "talisman", "head", "torso", "legs", "shield", "1handed", "2handed", "mount"]
        if(!types.includes(def.Type)) {
            console.log(`Invalid type: ${def.Type} in item ${def.ItemName}`)
            errored = true
        }
        
    }

    if(errored) throw "found invalid types"
}

/**
 * Runs check against ArmouryDefs
 * If found another same ItemName, it throws an exception
 */
function CheckForDuplicateItemName() {
    const seen = new Set();

    for (const object of ArmouryDefs) {
        if (seen.has(object.ItemName)) {
            throw new Error(`Duplicate ItemName found: ${object.ItemName}`);
        }
        seen.add(object.ItemName);
    }
}


/**
 * Ensure that thumbnails defined in the ArmouryDef are valid
 */

function CheckForThumbnailPath() {
    let errored = false
    for (const def of ArmouryDefs) {
        if(def.Type != "head") continue

        const thumbnailPath = path.isAbsolute(def.Thumbnail) ? def.Thumbnail : path.join(__dirname, '..', def.Thumbnail)
        const unitCardThumbnailPath = path.isAbsolute(def.UnitCardThumbnail) ? def.UnitCardThumbnail : path.join(__dirname, '..', def.UnitCardThumbnail)

        if (!fs.existsSync(thumbnailPath) || path.extname(thumbnailPath) !== '.png') {
            console.log(`Invalid Thumbnail: ${thumbnailPath}`)
            errored = true
            continue
        }
        if (!fs.existsSync(unitCardThumbnailPath) || path.extname(unitCardThumbnailPath) !== '.png') {
            console.log(`Invalid Unit Card Thumbnail: ${unitCardThumbnailPath}`)
            errored = true
            continue
        }
        const filename = path.basename(unitCardThumbnailPath, ".png")
        if(filename != def.ItemName) {
            console.log(`File name does not match with ItemName: ${unitCardThumbnailPath}, ItemName is ${def.ItemName}`)
            errored = true
        }
    }

    if(errored) throw "found invalid thumbnail"
}

/**
 * Check if Icon points to valid pngs
 */

function CheckForIconsPath() {
    let errored = false
    for (const def of ArmouryDefs) {

        if(!def.UiIcon) {
            console.log(`No icon: ${def.ItemName}`)
            errored = true
            continue
        }

        const icon = path.isAbsolute(def.UiIcon) ? def.UiIcon : path.join(__dirname, '..', def.UiIcon)

        if (!fs.existsSync(icon) || path.extname(icon) !== '.png') {
            console.log(`Invalid icon: ${icon}`)
            errored = true
            continue
        }

        const filename = path.basename(icon, ".png")
        if(filename != def.ItemName) {
            console.log(`File name does not match with ItemName: ${icon}, ItemName is ${def.ItemName}`)
            errored = true
        }

    }

    if(errored) throw "found invalid icons"
}

/**
 * Ensure that default sets have cape, talisman, head, torso, legs, shield, 1handed, (or 2handed), (or mount)
 */
function CheckForDefaultSets() {
    let transformedData = {};

    for (let item of ArmouryDefs) {
        let armourySet = item["AssociatedWithArmouryItemSet"]

        if(!armourySet) continue
        
        if (!(armourySet in transformedData)) {
            transformedData[armourySet] = {}
        }
        
        transformedData[armourySet][item["Type"]] = item
    }

    let errored = false
    for (let armourySet in transformedData) {
        if (("1handed" in transformedData[armourySet] || "shield" in transformedData[armourySet]) && "2handed" in transformedData[armourySet]) {
            console.warn(`Conflict in ${armourySet}: both 1handed/shield and 2handed types are present.`)
            errored = true
        }

        if (!("head" in transformedData[armourySet] && 
              "torso" in transformedData[armourySet] )) {
            console.warn(`In ${armourySet}: both head and torso must be present.`)
            errored = true
        }
    }

    if(errored) throw "found conflicting/problematic default armour sets"

}

/**
 * variant mesh check
 */

function CheckForVariantMesh() {
    let errored = false
    for (let item of ArmouryDefs) {

        if (item["Type"] !== "mount" && 
            item["Type"] !== "talisman" && 
            item["Type"] !== "cape" && 
            item["VariantMesh"] == null) {
            console.warn(`Item ${item["ItemName"]} of type ${item["Type"]} has null VariantMesh.`);
            errored = true
        }
    }

    if(errored) throw "found null VariantMeshes"
}

CheckForDuplicateSubtypeKey()
CheckForDuplicateItemName()
CheckForInvalidTypes()
CheckForIconsPath()
CheckForThumbnailPath()
CheckForDefaultSets()
CheckForVariantMesh()

/**
 * Compiling the tables....
 */

/**
 * Generate agent_subtypes_to_armory_item_sets_tables
 * @returns {Array<object>}
 */
function GenerateArmouryItemSet() {
    const output = []
    for (const armoury of ArmouryData) {
        output.push({
            armoury_item_set: armoury.DefaultArmoryItemSet,
            agent_subtype: armoury.SubtypeKey
        })
    }

    return output
}

/**
 * Generate armory_item_set_items_tables
 * @returns {Array<object>}
 */
function GenerateArmoryItemSetItems() {
    const output = []
    for (const armoury of ArmouryData) {
        for (const armourDef of ArmouryDefs) {
            if(armourDef.AssociatedWithArmouryItemSet != armoury.DefaultArmoryItemSet) continue
            else {
                if(armourDef.Skeleton != armoury.Skeleton) continue
            }

            output.push({
                armoury_item: armourDef.ItemName,
                armoury_item_set: armoury.DefaultArmoryItemSet
            })
        }
    }

    return output
}

/**
 * Generate armory_item_set_items_tables but dummy (use case for no mounts)
 * @returns {Array<object>}
 */
function GenerateDummyArmoryItemSetItems() {
    const output = []
    for (const armoury of ArmouryData) {
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_left__${armoury.Skeleton}`,
            armoury_item_set: armoury.DefaultArmoryItemSet
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_right__${armoury.Skeleton}`,
            armoury_item_set: armoury.DefaultArmoryItemSet
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_wings__${armoury.Skeleton}`,
            armoury_item_set: armoury.DefaultArmoryItemSet
        })
    }

    return output
}

/**
 * Generate armory_item_sets_tables
 * @returns {Array<object>}
 */
function GenerateArmoryItemSets() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.DefaultArmoryItemSet);
    }

    const defaults = Array.from(seen)
    const output = []

    for (const key of defaults) {
        output.push({
            key: key
        })
    }

    return output
}

/**
 * Generate armory_item_slot_blacklists_tables
 * @returns {Array<object>}
 */
function GenerateArmoryItemSlotBlacklists() {
    const output = []
    for (const def of ArmouryDefs) {
        if(def.Type == "2handed") {
            output.push({
                armory_item: def.ItemName,
                slot: "weapon_2"
            })
        } 
        if(def.Type == "1handed") {
            output.push({
                armory_item: def.ItemName,
                slot: "weapon_1"
            })
        }
        if(def.Type == "shield") {
            output.push({
                armory_item: def.ItemName,
                slot: "weapon_1"
            })
        }
    }

    return output
}

/**
 * Generate armory_item_to_category_sets_tables
 * @returns {Array<object>}
 */
function GenerateArmoryItemToCategorySets() {
    const output = []
    for (const def of ArmouryDefs) {
        let categorySet = ""
        switch (def.Type) {
            case "cape":
            case "talisman":
            case "head":
            case "torso":
            case "cape":
            case "legs":
            case "mount":
                categorySet = "generic"
                break
            case "shield":
                categorySet = "weapon_shield"
                break
            case "1handed":
                categorySet = "weapon_1_handed"
                break
            case "2handed":
                categorySet = "weapon_2_handed"
                break        
            default:
                break;
        }

        output.push({
            armory_item: def.ItemName,
            category_set: categorySet
        })
    }

    return output
}

/**
 * Generate armory_item_to_category_sets_tables but dummy (use case for no mounts)
 * @returns {Array<object>}
 */
function GenerateDummyArmoryItemSlotBlacklists() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_left__${skeleton}`,
            category_set: "generic"
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_right__${skeleton}`,
            category_set: "generic"
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_wings__${skeleton}`,
            category_set: "generic"
        })
    }

    return output
}

function GenerateArmoryItemUiInfos() {
    const output = []
    for (const def of ArmouryDefs) {
        let type = ""
        switch (def.ItemCategory) {
            case "unique":
                type = "const_kitbasher_10_unique"
                break
            case "legendary":
                type = "const_kitbasher_20_legendary"
                break
            case "rare":
                type = "const_kitbasher_30_rare"
                break
            case "uncommon":
                type = "const_kitbasher_40_uncommon"
                break
            case "common":
                type = "const_kitbasher_50_common"
                break
            default:
                break;
        }

        output.push({
            armory_item: def.ItemName,
            type: type
        })
    }

    return output
}

function GenerateDummyArmoryItemUiInfos() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_left__${skeleton}`,
            type: "const_kitbasher_50_common"
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_right__${skeleton}`,
            type: "const_kitbasher_50_common"
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_wings__${skeleton}`,
            type: "const_kitbasher_50_common"
        })
    }

    return output
}

function GenerateArmoryItemVariantUiInfos() {
    const output = []

    for (const def of ArmouryDefs) {
        output.push({
            key: def.ItemName
        })
    }

    return output
}

function GenerateDummyArmoryItemVariantUiInfos() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            key: `const_kitbasher_dummy_arm_left__${skeleton}`,
        })
        output.push({
            key: `const_kitbasher_dummy_arm_right__${skeleton}`,
        })
        output.push({
            key: `const_kitbasher_dummy_wings__${skeleton}`,
        })
    }

    return output
}

function GenerateArmoryItemVariants() {
    const output = []

    for (const def of ArmouryDefs) {
        switch (def.Type) {
            case "cape":
            case "talisman":
            case "head":
            case "torso":
            case "cape":
            case "legs":
            case "mount":
            case "shield":
                output.push({
                    armoury_item: def.ItemName,
                    variant: def.ItemName,
                    battle_animation: null,
                    campaign_animation: null,
                    use_as_default: true,
                    ui_info: def.ItemName
                })
                break
            case "1handed":
            case "2handed":
                output.push({
                    armoury_item: def.ItemName,
                    variant: def.ItemName,
                    battle_animation: def.BattleAnimation,
                    campaign_animation: def.CampaignAnimation,
                    use_as_default: true,
                    ui_info: def.ItemName
                })
                break
            default:
                break;
        }

    }

    return output
}

function GenerateDummyArmoryItemVariants() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_left__${skeleton}`,
            variant: `const_kitbasher_dummy_arm_left__${skeleton}`,
            battle_animation: null,
            campaign_animation: null,
            use_as_default: true,
            ui_info: `const_kitbasher_dummy_arm_left__${skeleton}`
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_arm_right__${skeleton}`,
            variant: `const_kitbasher_dummy_arm_right__${skeleton}`,
            battle_animation: null,
            campaign_animation: null,
            use_as_default: true,
            ui_info: `const_kitbasher_dummy_arm_right__${skeleton}`,
        })
        output.push({
            armoury_item: `const_kitbasher_dummy_wings__${skeleton}`,
            variant: `const_kitbasher_dummy_wings__${skeleton}`,
            battle_animation: null,
            campaign_animation: null,
            use_as_default: true,
            ui_info: `const_kitbasher_dummy_wings__${skeleton}`,
        })
        output.push({
            armoury_item:  `const_kitbasher_dummy_tail__${skeleton}`,
            variant: `const_kitbasher_dummy_tail__${skeleton}`,
            battle_animation: null,
            campaign_animation: null,
            use_as_default: true,
            ui_info: `const_kitbasher_dummy_tail__${skeleton}`,
        })
    }

    return output
}

function GenerateArmoryItems() {
    const output = []

    for (const def of ArmouryDefs) {
        let slot = ""
        switch (def.Type) {
            case "cape":
                slot = "left_arm"
                break
            case "talisman":
                slot = "tail"
                break
            case "head":
                slot = "head"
                break
            case "torso":
                slot = "torso"
                break
            case "legs":
                slot = "legs"
                break
            case "mount":
                slot = "right_arm"
                break
            case "shield":
                slot = "shield"
                break
            case "1handed":
                slot = "weapon_2"
                break
            case "2handed":
                slot = "weapon_1"
                break
            default:
                break;
        }

        output.push({
            key: def.ItemName,
            slot_type: slot
        })
    }

    return output
}


function GenerateDummyArmoryItems() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            key: `const_kitbasher_dummy_arm_left__${skeleton}`,
            slot_type: "left_arm",
        })
        output.push({
            key: `const_kitbasher_dummy_arm_right__${skeleton}`,
            slot_type: "right_arm",
        })
        output.push({
            key:  `const_kitbasher_dummy_tail__${skeleton}`,
            slot_type: "wings",
        })
        output.push({
            key: `const_kitbasher_dummy_wings__${skeleton}`,
            slot_type: "tail",
        })
    }

    return output
}

function GenerateBattleSkeletonParts() {
    const output = []

    for (const def of ArmouryDefs) {

        let skeleton =  def.Skeleton || "humanoid01"

        output.push({
            variant_name: def.ItemName,
            skeleton: skeleton
        })
    }

    return output
}

function GenerateDummyBattleSkeletonParts() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            variant_name: `const_kitbasher_dummy_arm_left__${skeleton}`,
            skeleton: skeleton,
        })
        output.push({
            variant_name: `const_kitbasher_dummy_arm_right__${skeleton}`,
            skeleton: skeleton,
        })
        output.push({
            variant_name:  `const_kitbasher_dummy_tail__${skeleton}`,
            skeleton: skeleton,
        })
        output.push({
            variant_name: `const_kitbasher_dummy_wings__${skeleton}`,
            skeleton: skeleton,
        })
    }

    return output
}

function GenerateVariants() {
    const output = []

    for (const def of ArmouryDefs) {
        let variantMeshPath = def.VariantMeshMountScale || ""

        if(def.Type == "mount") variantMeshPath = ""

        output.push({
            variant_name: def.ItemName,
            tech_folder: null,
            variant_filename: def.VariantMesh,
            mount_scale: variantMeshPath,
            scale: def.VariantMeshScale,
            scale_variation: 0
        })
    }

    return output
}

function GenerateDummyVariants() {
    const seen = new Set();

    for (const object of ArmouryData) {
        seen.add(object.Skeleton);
    }

    const Skeletons = Array.from(seen)
    
    const output = []
    for (const skeleton of Skeletons) {
        output.push({
            variant_name: `const_kitbasher_dummy_arm_left__${skeleton}`,
            tech_folder: null,
            variant_filename: "",
            mount_scale: 1,
            scale: 1,
            scale_variation: 0
        })
        output.push({
            variant_name: `const_kitbasher_dummy_arm_right__${skeleton}`,
            tech_folder: null,
            variant_filename: "",
            mount_scale: 1,
            scale: 1,
            scale_variation: 0
        })
        output.push({
            variant_name:  `const_kitbasher_dummy_tail__${skeleton}`,
            tech_folder: null,
            variant_filename: "",
            mount_scale: 1,
            scale: 1,
            scale_variation: 0
        })
        output.push({
            variant_name: `const_kitbasher_dummy_wings__${skeleton}`,
            tech_folder: null,
            variant_filename: "",
            mount_scale: 1,
            scale: 1,
            scale_variation: 0
        })
    }

    return output
}

console.log(GenerateArmouryItemSet())
console.log(GenerateArmoryItemSetItems())
console.log(GenerateDummyArmoryItemSetItems())
console.log(GenerateArmoryItemSlotBlacklists())
console.log(GenerateArmoryItemSets())
console.log(GenerateArmoryItemToCategorySets())
console.log(GenerateDummyArmoryItemSlotBlacklists())
console.log(GenerateArmoryItemUiInfos())
console.log(GenerateDummyArmoryItemUiInfos())
console.log(GenerateArmoryItemVariantUiInfos())
console.log(GenerateDummyArmoryItemVariantUiInfos())
console.log(GenerateArmoryItemVariants())
console.log(GenerateDummyArmoryItemVariants())
console.log(GenerateArmoryItems())
console.log(GenerateDummyArmoryItems())
console.log(GenerateBattleSkeletonParts())
console.log(GenerateDummyBattleSkeletonParts())
console.log(GenerateVariants())
console.log(GenerateDummyVariants())

/**
 * TODO: Generate variantmesh also!
 */

function ClearDirectory() {
    let dir = path.join('..', 'build', 'intermediate')

    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            let filePath = path.join(dir, file)
            fs.unlinkSync(filePath)
        })
    }
}

function GenerateVariantMesh() {
    
    // Define the mapping for the part names and attach points
    const partMapping = {
        "cape": "left_arm",
        "talisman": "tail",
        "mount": "right_arm",
        "1handed": "weapon_2",
        "2handed": "weapon_1"
    }
    const attachPointMapping = {
        "1handed": 'attach_point="be_prop_1"',
        "2handed": 'attach_point="be_prop_0"',
        "shield": 'attach_point="be_prop_2"'
    }

    let dir = path.join('build', 'intermediate')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
    }

    let count = 0;
    const spinner = ['|', '/', '-', '\\']

    for (let item of ArmouryDefs) {
        let part = partMapping[item["Type"]] || item["Type"];
        let attachPoint = attachPointMapping[item["Type"]] || ""

        let xml = `<VARIANT_MESH>\n`
        xml += `    <SLOT name="${part}" ${attachPoint}>\n`
        xml += `        <VARIANT_MESH model="${item["VariantMesh"]}">\n`
        xml += `            <META_DATA>${item["AudioType"] ?? ""}</META_DATA>\n`
        xml += `        </VARIANT_MESH>\n`
        xml += `    </SLOT>\n`
        xml += `</VARIANT_MESH>`

        fs.writeFileSync(path.join('build', 'intermediate', `${item["ItemName"]}.variantmeshdefinition`), xml)
        
        count++
        process.stdout.write(`\r Processing ${spinner[count % spinner.length]} ${count} / ${ArmouryDefs.length}`)
    }

    process.stdout.write('\n')
}

ClearDirectory()
GenerateVariantMesh()

/**
 * TODO: Place the icons too!
 */


