"use client";

import { createContext, useContext, useMemo } from "react";
import { getServiceRegistry, type ServiceRegistry } from "@/infrastructure/mocks/service-registry";

const ServiceContext = createContext<ServiceRegistry | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const services = useMemo(() => getServiceRegistry(), []);
  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
}

export function useServices(): ServiceRegistry {
  const services = useContext(ServiceContext);
  if (!services) {
    throw new Error("Centok services are not available outside ServiceProvider.");
  }
  return services;
}
