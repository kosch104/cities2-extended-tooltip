using Colossal.Serialization.Entities;

using Game;
using Game.Rendering;
using Game.UI.Localization;
using Game.UI.Tooltip;

using System.Collections.Generic;

namespace ExtendedTooltip.Systems
{
	public partial class CustomGuideLineTooltipSystem : TooltipSystemBase
	{
		private GuideLinesSystem m_GuideLinesSystem;
		private List<TooltipGroup> m_Groups;

		protected override void OnCreate()
		{
			base.OnCreate();

			m_GuideLinesSystem = World.GetOrCreateSystemManaged<GuideLinesSystem>();
			m_Groups = new List<TooltipGroup>();
		}

		protected override void OnGamePreload(Purpose purpose, GameMode mode)
		{
			World.GetOrCreateSystemManaged<GuideLineTooltipSystem>().Enabled = false;
		}

		protected override void OnUpdate()
		{
			var tooltips = m_GuideLinesSystem.GetTooltips(out var dependencies);
			dependencies.Complete();

			for (var i = 0; i < tooltips.Length; i++)
			{
				var tooltipInfo = tooltips[i];
				if (m_Groups.Count <= i)
				{
					m_Groups.Add(new TooltipGroup
					{
						path = $"guideLineTooltip{i}",
						horizontalAlignment = TooltipGroup.Alignment.Center,
						verticalAlignment = TooltipGroup.Alignment.Center,
						children = { new FloatTooltip() }
					});
				}

				var tooltipGroup = m_Groups[i];
				var tooltipPos = WorldToTooltipPos(tooltipInfo.m_Position);

				if (!tooltipGroup.position.Equals(tooltipPos))
				{
					tooltipGroup.position = tooltipPos;
					tooltipGroup.SetChildrenChanged();
				}

				var intTooltip = tooltipGroup.children[0] as FloatTooltip;
				switch (tooltipInfo.m_Type)
				{
					case GuideLinesSystem.TooltipType.Angle:
						intTooltip.icon = "Media/Glyphs/Angle.svg";
						intTooltip.value = tooltipInfo.m_IntValue;
						intTooltip.unit = "angle";
						break;
					case GuideLinesSystem.TooltipType.Length:
						intTooltip.icon = "Media/Glyphs/Length.svg";
						intTooltip.value = tooltipInfo.m_IntValue / 8f;
						intTooltip.unit = "floatTwoFractions";
						intTooltip.label = LocalizedString.Value("U");
						break;
				}

				AddGroup(tooltipGroup);
			}
		}
	}
}
