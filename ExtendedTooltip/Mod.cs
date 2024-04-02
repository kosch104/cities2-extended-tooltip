using Colossal.Logging;
using Game;
using Game.Modding;
using ExtendedTooltip.Systems;
using System;
using Unity.Entities;
using Game.UI.Tooltip;
using ExtendedTooltip.Controllers;
using Gooee.Plugins.Attributes;
using Gooee.Plugins;
using HarmonyLib;
using Game.SceneFlow;
using System.IO;

namespace ExtendedTooltip
{
    public class Mod : IMod
    {
        public const string Name = "ExtendedTooltip";
        public const string Version = "1.0.2";
        public static Mod Instance { get; set; }
        private readonly static ILog _log = LogManager.GetLogger("ExtendedTooltip").SetShowsErrorsInUI(false);
        private World _world;
        public static Harmony _harmony;

        public static string AssemblyPath
        {
            get;
            private set;
        }

        public void OnLoad(UpdateSystem updateSystem)
        {
            if(GameManager.instance.modManager.TryGetExecutableAsset(this, out var asset))
            {
                AssemblyPath = Path.GetDirectoryName(asset.path.Replace('/', Path.DirectorySeparatorChar));
            }
            _harmony = new Harmony("cities2modding_extendedtooltip");
            _log.Info(Environment.NewLine + @":::::::::: :::    ::: ::::::::::: :::::::::: ::::    ::: :::::::::  :::::::::: :::::::::  
:+:        :+:    :+:     :+:     :+:        :+:+:   :+: :+:    :+: :+:        :+:    :+: 
+:+         +:+  +:+      +:+     +:+        :+:+:+  +:+ +:+    +:+ +:+        +:+    +:+ 
+#++:++#     +#++:+       +#+     +#++:++#   +#+ +:+ +#+ +#+    +:+ +#++:++#   +#+    +:+ 
+#+         +#+  +#+      +#+     +#+        +#+  +#+#+# +#+    +#+ +#+        +#+    +#+ 
#+#        #+#    #+#     #+#     #+#        #+#   #+#+# #+#    #+# #+#        #+#    #+# 
########## ###    ###     ###     ########## ###    #### #########  ########## #########  
::::::::::: ::::::::   ::::::::  :::    ::::::::::: ::::::::::: :::::::::                 
    :+:    :+:    :+: :+:    :+: :+:        :+:         :+:     :+:    :+:                
    +:+    +:+    +:+ +:+    +:+ +:+        +:+         +:+     +:+    +:+                
    +#+    +#+    +:+ +#+    +:+ +#+        +#+         +#+     +#++:++#+                 
    +#+    +#+    +#+ +#+    +#+ +#+        +#+         +#+     +#+                       
    #+#    #+#    #+# #+#    #+# #+#        #+#         #+#     #+#                       
    ###     ########   ########  ########## ###     ########### ###                       ");
            updateSystem?.UpdateAt<CustomTranslationSystem>(SystemUpdatePhase.UIUpdate);
            updateSystem?.UpdateAt<ExtendedTooltipUISystem>(SystemUpdatePhase.UIUpdate);
            updateSystem?.UpdateAt<ExtendedTempTooltipSystem>(SystemUpdatePhase.UITooltip);
            updateSystem?.UpdateAt<ExtendedTooltipSystem>(SystemUpdatePhase.UITooltip);
            updateSystem?.UpdateAt<ExtendedBulldozerTooltipSystem>(SystemUpdatePhase.UITooltip);
            _world = updateSystem.World;
        }

        private void SafelyRemove<T>()
            where T : GameSystemBase
        {
            var system = _world.GetExistingSystemManaged<T>();

            if (system != null)
                _world?.DestroySystemManaged(system);
        }

        public void OnDispose()
        {
            SafelyRemove<CustomTranslationSystem>();
            SafelyRemove<ExtendedTooltipUISystem>();
            SafelyRemove<ExtendedTempTooltipSystem>();
            SafelyRemove<ExtendedTooltipSystem>();
            SafelyRemove<ExtendedBulldozerTooltipSystem>();
            _harmony?.UnpatchAll("cities2modding_extendedtooltip");
        }

        public static void DebugLog(string message)
        {
            _log.Info(message);
        }

        [ControllerTypes(typeof(ExtendedTooltipController))]
        public partial class ExtendedTooltip : IGooeePluginWithControllers, IGooeeChangeLog, IGooeeStyleSheet
        {
            public string Name => "ExtendedTooltip";
            public string Version => Mod.Version;
            public string ScriptResource => "ExtendedTooltip.Resources.ui.js";
            public string StyleResource => null;
            public IController[] Controllers { get; set; }
            public string ChangeLogResource => null;
        }
    }
}
