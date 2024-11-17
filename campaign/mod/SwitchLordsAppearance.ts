namespace BretonniaLordArmoury {
    
    const x = BretonniaInGameKitbash
    const a = AdmiralNelsonLordPack.BretLordPack

    //Bretonnia Lord packs specifics
    a.AddBigSizedLord("admiralnelson_bret_lord_massif_agent_key_1")
    a.AddBigSizedLord("admiralnelson_bret_lord_massif_sword_shield_agent_key_1")
    a.AddNormalSizedLord("admiralnelson_bret_lord_2handed_agent_key_1")
    a.AddNormalSizedLord("admiralnelson_wh_main_brt_lord_agent_key_1")


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
        "admiralnelson_bret_lord_massif_sword_shield_agent_key_1",
        (_, characther) => {
            x.console.warn("charnging admiralnelson_bret_lord_massif_sword_shield_agent_key_1 apperarance!")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_massif_sword_shield_art_key_override_1")
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
        "admiralnelson_bret_lord_2handed_agent_key_1",
        (agentKey, characther) => {
            x.console.warn("changing admiralnelson_bret_lord_2handed_agent_key_1")
            characther.ChangeModelAppearance("admiralnelson_brt_generic_paladin_2handed_art_key_override")
        }
    )

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
         "admiralnelson_wh_main_brt_lord_agent_key_1",
         (agentKey, characther) => {
             x.console.warn("changing admiralnelson_wh_main_brt_lord_agent_key_1")
             characther.ChangeModelAppearance("admiralnelson_brt_generic_lord_sword_shield_art_key_override_1")
        }
    )

    const FLAG_LORDS_HAVE_BEEN_REPLACED = "ADMNELSON_BRETLORDPACKS_ARMOURY_ENABLED_VER"
    const VER = "1"

    const GenericBretonnianFactions : {[factionKey: string] : string} = {
        //big lord, no helmet, grail knight shield, questing knight armour
        "wh2_main_brt_knights_of_origo": "admiralnelson_bret_lord_massif_sword_shield_agent_key", 
        //big lord, with big helmet covered, crusader shield, questing knight armour
        "wh2_main_brt_knights_of_the_flame" : "admiralnelson_bret_lord_massif_sword_shield_agent_key_1", 
        //default lord face with flat open helmet w/ crest
        "wh2_main_brt_thegans_crusaders" : "admiralnelson_wh_main_brt_lord_agent_key_1",
        //big lord, w/o helmet, simple bretonni shield
        "wh3_main_brt_aquitaine" : "admiralnelson_bret_lord_massif_sword_shield_agent_key_1",
         //big lord, fierceful, wields the bane of undead, helmet with pig crest, wields the legacy cape
        "wh_main_brt_artois" : "admiralnelson_bret_lord_massif_agent_key",
        //old lord w/o helmet, midsummer sun armour, paladin cape
        "wh_main_brt_bastonne": "admiralnelson_wh_main_brt_lord_agent_key_1",
         //default lord face w/o helmet, perhaps silvered armour, grail knight cape 
        "wh_main_brt_parravon": "",
        //2handed lord w/o helmet, questing sword, fortune armour
        "wh_main_brt_lyonesse": "admiralnelson_bret_lord_2handed_agent_key_1" 
    }

    const GenericBretonnianFactionsToLordAncillary : {[factionKey: string] : string[]}  = {
        //big lord, no helmet, grail knight shield, questing knight armour
        "wh2_main_brt_knights_of_origo": ["admiralnelson_grail_knight_shield_shield_anciliary_key", "admiralnelson_questing_knight_tabard_item_key", "admiralnelson_silvered_greaves_item_key"], 
        //big lord, with big helmet covered, crusader shield, questing knight armour
        "wh2_main_brt_knights_of_the_flame" : ["admiralnelson_great_helmet_helmet_anciliary_key", "admiralnelson_bretonni_reinforced_cross_shield_shield_anciliary_key", "admiralnelson_questing_knight_tabard_item_key", "admiralnelson_silvered_greaves_item_key"], 
        //default lord face with flat open helmet w/ crest
        "wh2_main_brt_thegans_crusaders" : ["admiranelson_chainmail_gilded_helmet_with_flaptop_crest_helmet_ancillary_key", "admiralnelson_armour_of_revered_tabard_item_key", "admiralnelson_paladin_cape_item_key", "admiralnelson_silvered_greaves_item_key"],
        //big lord, w/o helmet, simple bretonni shield
        "wh3_main_brt_aquitaine" : ["admiralnelson_bretonni_three_symbols_shield_shield_anciliary_key", "wh_dlc07_anc_armour_cuirass_of_fortune", "admiralnelson_gilded_greaves_item_key"],
         //big lord, fierceful, wields the bane of undead, helmet with pig crest, wields the legacy cape
        "wh_main_brt_artois" : ["admiralnelson_gilded_sallet_crest_helmet_anciliary_key", "wh_dlc07_anc_armour_armour_of_the_midsummer_sun", "admiralnelson_verdant_cleaver_axe_item_key", "admiralnelson_legacy_cape_item_key", "admiralnelson_gilded_greaves_item_key", "admiralnelson_pauldrons_with_neck_guard_pauldrons_item_key"],
        //old lord w/o helmet, revered tabard, paladin cape
        "wh_main_brt_bastonne": ["admiralnelson_armour_of_revered_tabard_item_key", "admiralnelson_paladin_cape_item_key", "admiralnelson_ornate_steel_greaves_item_key"],
         //default lord face w/o helmet, perhaps silvered armour, grail knight cape 
        "wh_main_brt_parravon": ["normal_wh_main_anc_armour_armour_of_silvered_steel", "admiralnelson_pauldrons_with_single_neck_guard_pauldrons_item_key", "admiralnelson_ornate_steel_greaves_item_key", "admiralnelson_grail_knight_cape_item_key"],
        //2handed lord w/o helmet, questing sword, 
        "wh_main_brt_lyonesse": ["wh_main_anc_armour_gamblers_armour", "admiralnelson_pauldrons_with_single_neck_guard_pauldrons_item_key", "wh_dlc07_anc_weapon_sword_of_the_quest"] 
    }
        
    
    function IsMixuLordModsInstalled() : boolean {
        return false
    }

    function DiversifyBretonnianLords() {

        console.warn("DiversifyBretonnianLords is loaded")

        if(IsMixuLordModsInstalled()) {
            console.warn("Mixu lords is installed, aborting")
            console.warn("Maybe we should implement Mixu Bretonnian lords with our armoury system?")
            return
        }

        core.add_listener(
            "start on the next turn",
            "FactionTurnStart",
            (context) => {
                const isThisFirstTurn = GetTurnNumber() <= 2
                return isThisFirstTurn
            },
            (context) => {
                if(!context.faction) return

                const faction = WrapIFactionScriptToFaction(context.faction())
                if(!faction) return

                DoTheReplace()
                AssertionToCheckIfReplacedLordStillHaveTheSameType(faction)
            },
            true
        )
    }

    function DoTheReplace() {
        const isThisFirstTurn = GetTurnNumber() <= 2
        if(!isThisFirstTurn) {
            console.warn("Mod is enabled past first turn, stopping!")
            console.warn("Use this mod on new campaign")
            return
        }

        const wasLordsReplaced = localStorage.getItem(FLAG_LORDS_HAVE_BEEN_REPLACED) as string
        if(wasLordsReplaced != null) {
            console.warn("Mod was enabled already. Stopping here")
            return
        }
        
        const factionKeys = Object.keys(GenericBretonnianFactions)
        for (const factionKey of factionKeys) {
            const faction = GetFactionByKey(factionKey)
            if(faction == null) continue
             
            console.warn("Replacing " + factionKey)
            ReplaceFactionLeader(faction)
        }

        localStorage.setItem(FLAG_LORDS_HAVE_BEEN_REPLACED, VER)

    }

    function AssertionToCheckIfReplacedLordStillHaveTheSameType(faction: Faction) {
        const factionKey = faction.FactionKey
        const factionLeaderTypeMustBe = GenericBretonnianFactions[factionKey]
        if(factionLeaderTypeMustBe == null || factionLeaderTypeMustBe == "") {
            //skip assertion
            return
        }

        const isThisPreTurn2 = GetTurnNumber() < 2
        if(isThisPreTurn2) {
            //early turn, skip assertion
            return
        }

        const isThisPastTurn15 = GetTurnNumber() >= 15
        if(isThisPastTurn15) {
            //skip assertion, entering late game
            return
        }

        const factionLeader = faction.FactionLeader
        const leaderKey = factionLeader?.SubtypeKey
        const isFactionLeaderReplaced = leaderKey == factionLeaderTypeMustBe
        if(!isFactionLeaderReplaced) {
            console.warn("WARNING, somehow our replaced leader doesn't match the type with intended type. Current " + leaderKey + " intended faction leader key " + factionLeaderTypeMustBe)
        }
    }

    function ReplaceFactionLeader(faction: Faction) {
        const factionLeader = TryCastCharacterToLord(TrustMeThisCast(faction.FactionLeader))
        if(factionLeader == null) return

        const armies = factionLeader.Troops
        const traits = factionLeader.Traits
        const agentKey = GenericBretonnianFactions[faction.FactionKey]
        if(agentKey != "") {
            new Lord({
                agentKey: agentKey,
                factionKey: faction.FactionKey,
                regionKey: factionLeader.CurrentRegionKey,
                setAsFactionLeader: true,
                lordCreatedCallback: (theLordHimself, reason) => {
                    traits.forEach(element => {
                        theLordHimself.AddTrait(element.traitKey, false, element.traitLevel)
                    })
                    const troopKeys = armies.map( (x) => x.unitKey )
                    theLordHimself.AddTroops(troopKeys)
                    theLordHimself.RenameLocalised(factionLeader.RawForename, factionLeader.RawSurename)
                    const equipments = GenericBretonnianFactionsToLordAncillary[faction.FactionKey]
                    setTimeout(() => {
                        console.warn("Applying the annciliaries for this lord: " + theLordHimself.LocalisedFullName)
                        equipments.forEach((x, index) => {
                            setTimeout(() => {
                                console.warn("Applying the annciliaries: " + x )
                                theLordHimself.AddAnciliary(x, true, true);
                            }, 600 * (index + 1))
                        })
                    }, 600)
                    setTimeout( () => {
                        factionLeader.SetImmortality(false)
                        factionLeader.Kill(true, true)
                        theLordHimself.SetImmortality(true)

                        //special for Chilfroy:
                        if(faction.FactionKey == "wh_main_brt_artois") {
                            //give him bunch of questing knights
                            //and archers
                            theLordHimself.AddTroops([
                                "wh_dlc07_brt_cav_questing_knights_0",
                                "wh_dlc07_brt_cav_questing_knights_0",
                                "wh_dlc07_brt_cav_questing_knights_0",
                                "wh_dlc07_brt_inf_peasant_bowmen_1",
                                "wh_dlc07_brt_inf_peasant_bowmen_1",
                                "wh_dlc07_brt_inf_peasant_bowmen_1",
                            ])
                            //and sum moneh, just to counter Kemmler for sometime
                            theLordHimself.Faction.AddMoney(20000)
                        }

                        console.log("Replace done for " + faction.FactionKey)
                    }, 300)
                },
                onFailed() {
                    console.error("Failed to replace lord " + factionLeader.SubtypeKey + " on faction " + faction.FactionKey)
                }
            })
        } else {
            const equipments = GenericBretonnianFactionsToLordAncillary[faction.FactionKey]
            console.warn("Applying the annciliaries for this lord (lord not replaced!): " + factionLeader.LocalisedFullName)
            equipments.forEach((x, index) => {
                setTimeout(() => {
                    console.warn("Applying the annciliaries (lord not replaced!): " + x )
                    factionLeader.AddAnciliary(x, true, true);
                }, 600 * (index + 1))
            })
        }
        
    }

    OnCampaignStart(() => DiversifyBretonnianLords())

}