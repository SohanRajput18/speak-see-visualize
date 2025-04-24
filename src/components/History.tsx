
import { History as HistoryIcon } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function History() {
  const { queryHistory } = useVoice();
  const navigate = useNavigate();

  const handleQueryClick = (query: string) => {
    navigate('/results');
  };

  return (
    <Sidebar className="border-r border-[#403E43]/10">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <HistoryIcon className="w-4 h-4 text-[#1EAEDB]" />
            Query History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {queryHistory?.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    onClick={() => handleQueryClick(item.transcript)}
                    className="text-[#8E9196] hover:text-[#1EAEDB]"
                  >
                    <span>{item.transcript}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {(!queryHistory || queryHistory.length === 0) && (
                <div className="px-4 py-3 text-sm text-[#8E9196]">
                  No queries yet. Try speaking something!
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
