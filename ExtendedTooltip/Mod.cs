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
        public static Mod Instance { get; set; }
        private readonly static ILog _log = LogManager.GetLogger("ExtendedTooltip").SetShowsErrorsInUI(false);
        public static string Name = "ExtendedTooltip";
        public static string Version = "1.0.4";
        private World _world;
        public static Harmony _harmony;
        public static string harmonyId = $"cities2modding_{Name.ToLower()}";

        public static string AssemblyPath
        {
            get;
            private set;
        }

        public void OnLoad(UpdateSystem updateSystem)
        {
            if (GameManager.instance.modManager.TryGetExecutableAsset(this, out var asset))
            {
                AssemblyPath = Path.GetDirectoryName(asset.path.Replace('/', Path.DirectorySeparatorChar));
            }
            _harmony = new Harmony(harmonyId);
            _harmony.PatchAll();

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
            _harmony?.UnpatchAll(harmonyId);
        }

        public static void DebugLog(string message)
        {
            _log.Info(message);
        }

        [ControllerTypes(typeof(ExtendedTooltipController))]
        public partial class ExtendedTooltip : IGooeePluginWithControllers, IGooeeChangeLog, IGooeeStyleSheet
        {
            public string Name => Mod.Name;
            public string Version => Mod.Version;
            public string ScriptResource => $"{Mod.Name}.Resources.ui.js";
            public string StyleResource => null;
            public IController[] Controllers { get; set; }
            public string ChangeLogResource => null;
        }
    }
}
