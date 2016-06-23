module ApplicationHelper
	# get url to small thumbnail from image upload.. 100x100 pass full thumbnail url
	def syn_mini_thumb_url(url)
		file_name = File.basename(url)
		thumb_name = "thumb/#{file_name.parameterize}#{File.extname(file_name)}"
		mini_thumb_url = url.sub(file_name, thumb_name)
		return mini_thumb_url
	end

end
