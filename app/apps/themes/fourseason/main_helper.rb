module Themes::Fourseason::MainHelper
  def self.included(klass)
    # klass.helper_method [:my_helper_method] rescue "" # here your methods accessible from views
  end

  def fourseason_settings(theme)
    # here your code on save settings for current site, by default params[:theme_fields] is auto saved into theme
    # Also, you can save your extra values added in admin/settings.html.erb
    # sample: theme.set_meta("my_key", params[:my_value])
    theme.set_field_values(params[:field_options])
  end

  # callback called after theme installed
  def fourseason_on_install_theme(theme)
    unless theme.get_field_groups.where(slug: "fields").any?
      group = theme.add_field_group({name: "Main Settings", slug: "fields", description: ""})
      group.add_field({"name"=>"Background color", "slug"=>"bg_color"},{field_key: "colorpicker"})
      group.add_field({"name"=>"Links color", "slug"=>"links_color"},{field_key: "colorpicker"})
      group.add_field({"name"=>"Background image", "slug"=>"bg"},{field_key: "image"})
    end
    theme.set_meta("installed_at", Time.current.to_s) # save a custom value
  end

  # callback executed after theme uninstalled
  def fourseason_on_uninstall_theme(theme)
  end

  def fourseason_admin
    # inject stylesheet into tinymce
    # this ended up being best way.. need to change link on each compile..
    append_pre_asset_content("<script>
      $(window).load(function(){
        if($('.tinymce_textarea').length){
          var poll = setInterval(function(){
            if(tinymce.editors[0]){
              tinymce.editors[0].dom.loadCSS('/assets/themes/fourseason/assets/css/main-aea67ebfccfcfc209922e7291d47bd91f6eab9aedc533fdf2e43f585dcd33178.css')
              clearInterval(poll)
            } else {
              console.log('no editor yet.. polling');
            }

            }, 500);
        }
      });
      </script>")
  end

  def fourseason_contact_form_item_render(args)
    args[:template] = "<div class='contact-name-field content'>[ci]</div>" #show only field [ci]
    args[:custom_class] = "" # custom class for the field
    
    args[:custom_attrs]["placeholder"] = args[:field][:label] #adding placeholder to the field
    
    if args[:field][:field_type] == "paragraph" # paragraph? wtf? textarea ?
      args[:custom_attrs]["rows"] = "6"
    end

    if args[:field][:field_type] == "email"
      args[:custom_attrs]["style"] = "width: 100%" #fix issue on email field, rails styling
    end
    
  end

  def fourseason_contact_form_render(args)
    if args[:form].name == "Contact Form"
      args[:submit] = "<div class='contact-button content text-right'>
                  <input type='submit' class='button normal-button' name='contact-submit' value='SEND MESSAGE'>
                </div>"
    end

    
  end

end
