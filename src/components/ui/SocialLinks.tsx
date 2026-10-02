import { ArrowUpRight, Facebook, Instagram, Music2, Youtube } from 'lucide-react';
import { profileContent } from '../../data/profileContent';

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const contact = profileContent.contact;
  const links = [
    { name: 'Facebook', href: contact.facebookUrl, Icon: Facebook },
    { name: 'TikTok', href: contact.tiktokUrl, Icon: Music2 },
    { name: 'Instagram', href: contact.instagramUrl, Icon: Instagram },
    { name: 'YouTube', href: contact.youtubeUrl, Icon: Youtube },
  ];
  return <div className={`gun-socials ${compact ? 'gun-socials-compact' : ''}`}>
    {links.map(({ name, href, Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Mở ${name} của Hải`} title={name}>
      <Icon size={18} /><span>{name}</span>{!compact && <ArrowUpRight size={14} />}
    </a>)}
  </div>;
}
