import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Home, Image as ImageIcon, Link2, LogIn, Mail, MapPin, MessageCircle, Plus, Search, Share2, Star, User, Users } from "lucide-react";

// -----------------------------
// Mock Data
// -----------------------------
const users = [
  { id: 1, name: "Aisha Khan", title: "Product Designer", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Rahul Sharma", title: "Founder", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Chris Lee", title: "iOS Engineer", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Mina Patel", title: "Data Scientist", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Diego Perez", title: "Growth Marketer", avatar: "https://i.pravatar.cc/100?img=5" },
];

const stories = users.map((u, i) => ({ id: i + 1, user: u, image: `https://picsum.photos/seed/story-${i}/300/400` }));

const products = [
  { id: 1, name: "Nebula Watch", rating: 4.8, price: 199, image: "https://picsum.photos/seed/p1/600/400" },
  { id: 2, name: "Aurora Headphones", rating: 4.4, price: 149, image: "https://picsum.photos/seed/p2/600/400" },
  { id: 3, name: "Quasar Drone", rating: 4.9, price: 899, image: "https://picsum.photos/seed/p3/600/400" },
];

const services = [
  { id: 1, name: "Logo Design", rating: 4.7, price: 59 },
  { id: 2, name: "App Prototype", rating: 4.6, price: 499 },
  { id: 3, name: "Photo Retouching", rating: 4.3, price: 29 },
];

const demoFeed = [
  {
    id: 1,
    author: users[0],
    text: "Launching my new design system today! #ux #design",
    media: "https://picsum.photos/seed/post1/900/600",
    likes: 128,
    comments: 23,
  },
  {
    id: 2,
    author: users[3],
    text: "Trained a small model to classify fruits. Results were better than expected!",
    media: "",
    likes: 76,
    comments: 12,
  },
];

const demoCommunities = [
  { id: 1, name: "Indie Hackers Hub", members: 1243, topics: ["SaaS", "Pricing", "Launches"] },
  { id: 2, name: "AI Builders", members: 3621, topics: ["LLMs", "Vision", "Agents"] },
  { id: 3, name: "Design Crit Club", members: 842, topics: ["Figma", "Motion", "Brand"] },
];

const demoMessages = [
  { id: 1, from: users[1], text: "Hey! Want to hop on a quick call about the prototype?", time: "2m" },
  { id: 2, from: users[2], text: "I left comments on the spec doc—looks solid.", time: "1h" },
  { id: 3, from: users[4], text: "Launching campaign Friday, any last-minute ideas?", time: "3h" },
];

const notifications = [
  { id: 1, icon: "like", text: "Mina liked your post", time: "just now" },
  { id: 2, icon: "follow", text: "Rahul started following you", time: "5m" },
  { id: 3, icon: "comment", text: "Chris commented: ‘Love this!’", time: "1h" },
];

// -----------------------------
// UI helpers
// -----------------------------
function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function StoryStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {stories.map((s) => (
        <Card key={s.id} className="min-w-[120px] rounded-2xl overflow-hidden">
          <div className="h-36 w-28 bg-muted">
            <img src={s.image} className="h-full w-full object-cover"/>
          </div>
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6"><AvatarImage src={s.user.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
              <span className="text-xs truncate">{s.user.name}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeedComposer() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 flex items-start gap-3">
        <Avatar><AvatarImage src={users[0].avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
        <div className="flex-1">
          <Textarea placeholder="Share something…" className="min-h-[60px]"/>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><ImageIcon className="h-4 w-4 mr-1"/>Media</Button>
              <Button variant="outline" size="sm"><Link2 className="h-4 w-4 mr-1"/>Link</Button>
            </div>
            <Button size="sm">Post</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeedPost({ post }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar><AvatarImage src={post.author.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
          <div>
            <CardTitle className="text-base leading-tight">{post.author.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{post.author.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{post.text}</p>
        {post.media && (
          <div className="rounded-xl overflow-hidden">
            <img src={post.media} className="w-full object-cover"/>
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Heart className="h-4 w-4"/>{post.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4"/>{post.comments}</span>
          <span className="flex items-center gap-1"><Share2 className="h-4 w-4"/>Share</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCard({ p }) {
  return (
    <Card className="rounded-2xl">
      <div className="h-32 bg-muted overflow-hidden rounded-t-2xl"><img src={p.image} className="h-full w-full object-cover"/></div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">${p.price}</div>
          </div>
          <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4"/>{p.rating}</div>
        </div>
        <Button className="w-full mt-3" variant="secondary">View</Button>
      </CardContent>
    </Card>
  );
}

function ServiceCard({ s }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{s.name}</div>
            <div className="text-xs text-muted-foreground">From ${s.price}</div>
          </div>
          <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4"/>{s.rating}</div>
        </div>
        <Button className="w-full mt-3" variant="secondary">Request</Button>
      </CardContent>
    </Card>
  );
}

function SearchBar({ placeholder = "Search…" }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
      <Input className="pl-9" placeholder={placeholder}/>
    </div>
  );
}

// -----------------------------
// Views
// -----------------------------
function HomeFeed() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <SectionTitle icon={Home} title="Home & Feed" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-1"/>New</Button>}/>
        <StoryStrip/>
        <FeedComposer/>
        {demoFeed.map((p) => <FeedPost key={p.id} post={p}/>)}
      </div>
      <div className="space-y-4">
        <SectionTitle icon={Users} title="People you may know"/>
        {users.map((u) => (
          <Card key={u.id} className="rounded-2xl">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar><AvatarImage src={u.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
                <div>
                  <div className="font-medium leading-none">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.title}</div>
                </div>
              </div>
              <Button size="sm" variant="secondary">Connect</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Connections() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Users} title="Connections & Discovery"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle>Search</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <SearchBar placeholder="Search people, products, services…"/>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><Input placeholder="Location"/></div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-40"><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle>Filters</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><Label>Verified only</Label><Switch/></div>
            <div className="flex items-center justify-between"><Label>Open to work</Label><Switch defaultChecked/></div>
            <div className="flex items-center justify-between"><Label>With reviews</Label><Switch defaultChecked/></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => <ProductCard key={p.id} p={p}/>)}
      </div>

      <SectionTitle icon={Star} title="Services"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s) => <ServiceCard key={s.id} s={s}/>)}
      </div>
    </div>
  );
}

function Communities() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Users} title="Communities" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-1"/>Create</Button>}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoCommunities.map((c) => (
          <Card key={c.id} className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-base">{c.name}</div>
                <Badge variant="secondary">{c.members.toLocaleString()} members</Badge>
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {c.topics.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
              </div>
              <Button className="w-full mt-3">Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2"><CardTitle>Submit a Poll (Premium)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Poll question"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input placeholder="Option A"/>
            <Input placeholder="Option B"/>
          </div>
          <Button className="w-full">Publish</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card className="rounded-2xl overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-indigo-200 to-cyan-200"/>
          <CardContent className="p-4">
            <div className="flex items-end gap-4 -mt-14">
              <Avatar className="h-24 w-24 border-4 border-background"><AvatarImage src={users[0].avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
              <div>
                <div className="text-xl font-semibold">Aisha Khan</div>
                <div className="text-sm text-muted-foreground">Product Designer • San Francisco</div>
              </div>
            </div>
            <Separator className="my-4"/>
            <SectionTitle icon={User} title="About"/>
            <p className="text-sm leading-relaxed">Human-centered designer focused on elegant, accessible interfaces. Previously @ Startup X. Coffee person ☕</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              <Badge variant="secondary">Figma</Badge>
              <Badge variant="secondary">Motion</Badge>
              <Badge variant="secondary">Design Systems</Badge>
              <Badge variant="secondary">Prototyping</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle>Posts, Media & Shorts</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-muted rounded-xl overflow-hidden"><img src={`https://picsum.photos/seed/media-${i}/700/400`} className="h-full w-full object-cover"/></div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle>Profile Badges</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between"><span>Pro</span><Badge>Active</Badge></div>
            <div className="flex items-center justify-between"><span>Verified</span><Badge variant="secondary">Pending</Badge></div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> aisha@example.com</div>
            <div className="flex items-center gap-2"><Link2 className="h-4 w-4"/> aisha.design</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MessagesView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="rounded-2xl lg:col-span-1">
        <CardHeader className="pb-2"><CardTitle>Chats</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[420px]">
            <div className="p-2 space-y-1">
              {demoMessages.map((m) => (
                <Button key={m.id} variant="ghost" className="w-full justify-start h-auto py-3">
                  <Avatar className="h-8 w-8 mr-3"><AvatarImage src={m.from.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
                  <div className="text-left">
                    <div className="font-medium leading-none">{m.from.name}</div>
                    <div className="text-xs text-muted-foreground truncate w-48">{m.text}</div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{m.time}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="rounded-2xl lg:col-span-2">
        <CardHeader className="pb-2"><CardTitle>Conversation</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoMessages.map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8"><AvatarImage src={m.from.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
                <div className="rounded-2xl p-3 bg-muted max-w-[80%]">
                  <div className="text-sm">{m.text}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Input placeholder="Type a message…"/>
              <Button>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="space-y-3">
      <SectionTitle icon={Bell} title="Notifications"/>
      {notifications.map((n) => (
        <Card key={n.id} className="rounded-2xl">
          <CardContent className="p-3 flex items-center gap-3">
            {n.icon === "like" && <Heart className="h-5 w-5"/>}
            {n.icon === "follow" && <Users className="h-5 w-5"/>}
            {n.icon === "comment" && <MessageCircle className="h-5 w-5"/>}
            <div className="text-sm">{n.text}</div>
            <div className="ml-auto text-xs text-muted-foreground">{n.time}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// -----------------------------
// Shell
// -----------------------------
function Logo() {
  return (
    <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120 }} className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400"/>
      <div className="font-semibold">SocialHub</div>
    </motion.div>
  );
}

function TopBar({ onAuth }) {
  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Logo/>
        <div className="flex-1 hidden md:block"><SearchBar/></div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><LogIn className="h-4 w-4 mr-1"/>Sign in</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Welcome back</DialogTitle>
                <DialogDescription>Sign in to continue</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Input placeholder="Email"/>
                <Input placeholder="Password" type="password"/>
                <Button onClick={onAuth}>Continue</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
          <Button variant="ghost" size="icon"><User className="h-5 w-5"/></Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [authed, setAuthed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <TopBar onAuth={() => setAuthed(true)}/>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-6 gap-2 rounded-2xl">
            <TabsTrigger value="home" className="rounded-xl"><Home className="h-4 w-4 mr-2"/>Home</TabsTrigger>
            <TabsTrigger value="connections" className="rounded-xl"><Users className="h-4 w-4 mr-2"/>Connections</TabsTrigger>
            <TabsTrigger value="communities" className="rounded-xl"><Users className="h-4 w-4 mr-2"/>Community</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl"><User className="h-4 w-4 mr-2"/>Profile</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl"><MessageCircle className="h-4 w-4 mr-2"/>Messages</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl"><Bell className="h-4 w-4 mr-2"/>Alerts</TabsTrigger>
          </TabsList>
          <div className="mt-6"/>
          <TabsContent value="home"><HomeFeed/></TabsContent>
          <TabsContent value="connections"><Connections/></TabsContent>
          <TabsContent value="communities"><Communities/></TabsContent>
          <TabsContent value="profile"><ProfileView/></TabsContent>
          <TabsContent value="messages"><MessagesView/></TabsContent>
          <TabsContent value="notifications"><NotificationsView/></TabsContent>
        </Tabs>
      </main>
      {!authed && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-4 left-0 right-0">
            <div className="mx-auto max-w-6xl px-4">
              <Card className="rounded-2xl border-2">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Logo/>
                    <div className="text-sm">Create an account to unlock communities, messaging, and polls.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setAuthed(true)}>Later</Button>
                    <Button onClick={() => setAuthed(true)}><Plus className="h-4 w-4 mr-1"/>Create account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
