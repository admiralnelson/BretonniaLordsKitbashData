namespace BretonniaInGameKitbashDataCompiler {

    export const VERSION = 1

    export class YourEntryPoint {

        constructor() {
            BretonniaInGameKitbash.KitbashedCharacter.Register(
                "wh_main_brt_louen_leoncouer", {
                possibleMounts: {
                    "kitbasher_horse_louen_base": "wh_main_anc_mount_brt_louen_barded_warhorse",
                    "kitbasher_pegasus_louen_base": "wh_main_anc_mount_brt_louen_royal_pegasus",
                    "kitbasher_beaquis_louen_base": "wh_main_anc_mount_brt_louen_beaquis",
                },
                specialItems : {
                    
                },
                defaultArmorySet: "admiralnelson_armory_louen_leonceour_basic"
            })
        }
    }
    
    new YourEntryPoint()
}