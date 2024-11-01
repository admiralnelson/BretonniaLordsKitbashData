namespace BretonniaLordsKitbashData {
    
    const x = BretonniaInGameKitbash

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_lord_massif_sword_shield_agent_key",
        (agentKey, characther) => {
            x.console.warn("Changing admiralnelson_bret_lord_massif_sword_shield_agent_key appearance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_massif_sword_shield_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_lord_massif_agent_key",
        (agentKey, characther) => {
            x.console.warn("Changing admiralnelson_bret_lord_massif_agent_key appearance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_massif_2handed_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_lord_massif_agent_key_1",
        (_, characther) => {
            x.console.warn("charnging admiralnelson_bret_lord_massif_agent_key_1 apperarance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_massif_2handed_art_key_override_1")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_paladin_massif_sword_shield_agent_key",
        (_, characther) => {
            x.console.warn("charnging admiralnelson_bret_paladin_massif_sword_shield_agent_key apperarance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_paladin_massif_sword_shield_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_lord_2handed_agent_key",
        (agentKey, characther) => {
            x.console.warn("Changing admiralnelson_bret_lord_2handed_agent_key appearance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_2handed_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "wh_main_brt_lord",
        (agentKey, characther) => {
            x.console.warn("Changing wh_main_brt_lord appearance!")
            characther.ChangeModelAppearance("wh_main_art_set_brt_lord_01")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_paladin_2handed_agent_key",
        (agentKey, characther) => {
            x.console.warn("changing admiralnelson_bret_paladin_2handed_agent_key")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_paladin_2handed_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "admiralnelson_bret_paladin_2handed_agent_key",
        (agentKey, characther) => {
            x.console.warn("changing admiralnelson_bret_paladin_2handed_agent_key")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_paladin_2handed_art_key_override")
        }
    )

}