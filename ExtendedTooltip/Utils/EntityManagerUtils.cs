using System;
using System.Linq;
using System.Reflection;
using Unity.Entities;

namespace ExtendedTooltip.Utils
{
    public static class EntityManagerUtils
    {
        public static object GetComponentDynamic(EntityManager entityManager, Entity entity, Type componentType)
        {
            var getComponentMethod = typeof(EntityManager).GetMethods(BindingFlags.Public | BindingFlags.Instance)
                .FirstOrDefault(m => m.Name == "GetComponentData"
                                     && m.IsGenericMethod
                                     && m.GetGenericArguments().Length == 1
                                     && m.GetParameters().Length == 1
                                     && m.GetParameters()[0].ParameterType == typeof(Entity));

            if (getComponentMethod == null)
            {
                throw new InvalidOperationException("GetComponentData method not found.");
            }

            var getComponentGeneric = getComponentMethod.MakeGenericMethod(componentType);
            return getComponentGeneric.Invoke(entityManager, [entity]);
        }
    }
}
