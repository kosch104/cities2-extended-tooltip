using System;

namespace ExtendedTooltip
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class SettingAttribute(string name) : Attribute
    {
        public string Name { get; } = name;
    }
}
