using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG6_R47
{
    public class LetChat:Hub
    {
        public void Send1(string message)
        {
            Clients.All.SendAsync("addMessage", message);
        }
        public void AddGroup(string gname)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, gname);
        }
        public void GetAllGroups(string a)
        {
            Clients.All.SendAsync("allGroups", a);
        }
        public void SendToGroup(string groupName, string message)
        {
            Clients.Group(groupName).SendAsync("addChatMessage", message);
        }

    }
}
