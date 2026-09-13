import AdminMenuItems from "./AdminMenuItems"
import BrandMenuItems, { getBrandMenuItems } from "./BrandMenuItems"
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import NavItem from './NavItem'
import NavCollapse from './NavCollapse'
import NavGroup from './NavGroup/NavGroup'
import { useContext, useState } from 'react'
import { CustomizerContext } from '@/context/customizerContext'
import { Divider } from '@mui/material'
import { roleType } from '@/features/brand/auth/types/auth'
import { AuthContext } from '@/context/authContext'

const SidebarItems = ({ role }: { role: roleType }) => {
  const pathname = usePathname()
  const pathDirect = pathname
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'))
  const { isSidebarHover, isCollapse, isMobileSidebar, setIsMobileSidebar } =
    useContext(CustomizerContext)
  const { brandStatus } = useContext(AuthContext)

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const hideMenu: any = lgUp
    ? isCollapse == 'mini-sidebar' && !isSidebarHover
    : ''

  const isBrandApproved = brandStatus === "APPROVED"
  const menuItems = role === "admin" ? AdminMenuItems : getBrandMenuItems(isBrandApproved)
  const [openCollapseId, setOpenCollapseId] = useState<string | null>(null)
  return (
    <Box sx={{ px: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ pt: 0, height: '100%', flex: 1 }} className='sidebarNav'>
        {menuItems.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            )

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          }
          else if (item && item.divider) {
            return <Divider key={`divider-${index}`} sx={{ my: 2 }} />;
          }
          else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => setIsMobileSidebar(!isMobileSidebar)}
                openCollapseId={openCollapseId}
                setOpenCollapseId={setOpenCollapseId}
              />
            )

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => setIsMobileSidebar(!isMobileSidebar)}
              />
            )
          }
        })}
      </List>
    </Box>
  )
}
export default SidebarItems
